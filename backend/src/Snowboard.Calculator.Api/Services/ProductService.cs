using System.Text.Json;
using System.Text.Json.Serialization;
using Snowboard.Calculator.Api.Models;

namespace Snowboard.Calculator.Api.Services;

public interface IProductService
{
    Task<ProductListResponse> GetProductsAsync(ProductFilter? filter = null);
    Task<Product?> GetProductByIdAsync(string id);
    Task<List<string>> GetBrandsAsync();
    Task<List<Product>> GetFeaturedProductsAsync(int limit = 4);
}

public class ProductService : IProductService
{
    private readonly List<Product> _products;
    private static readonly JsonSerializerOptions JsonOptions = new()
    {
        PropertyNameCaseInsensitive = true,
        Converters = { new JsonStringEnumConverter(JsonNamingPolicy.CamelCase) }
    };

    public ProductService()
    {
        var jsonPath = Path.Combine(AppContext.BaseDirectory, "Data", "products.json");

        // Try different paths for development vs production
        if (!File.Exists(jsonPath))
        {
            jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "products.json");
        }

        if (File.Exists(jsonPath))
        {
            var json = File.ReadAllText(jsonPath);
            _products = JsonSerializer.Deserialize<List<Product>>(json, JsonOptions) ?? [];
        }
        else
        {
            _products = [];
            Console.WriteLine($"Warning: products.json not found at {jsonPath}");
        }
    }

    public Task<ProductListResponse> GetProductsAsync(ProductFilter? filter = null)
    {
        filter ??= new ProductFilter();

        var query = _products.AsQueryable();

        // Apply filters
        if (filter.Category.HasValue)
        {
            query = query.Where(p => p.Category == filter.Category.Value);
        }

        if (!string.IsNullOrWhiteSpace(filter.Brand))
        {
            query = query.Where(p => p.Brand.Equals(filter.Brand, StringComparison.OrdinalIgnoreCase));
        }

        if (filter.MinPrice.HasValue)
        {
            query = query.Where(p => p.Price >= filter.MinPrice.Value);
        }

        if (filter.MaxPrice.HasValue)
        {
            query = query.Where(p => p.Price <= filter.MaxPrice.Value);
        }

        if (filter.InStock.HasValue)
        {
            query = query.Where(p => p.InStock == filter.InStock.Value);
        }

        if (filter.IsFeatured.HasValue)
        {
            query = query.Where(p => p.IsFeatured == filter.IsFeatured.Value);
        }

        if (!string.IsNullOrWhiteSpace(filter.Search))
        {
            var searchLower = filter.Search.ToLower();
            query = query.Where(p =>
                p.Name.Contains(searchLower, StringComparison.OrdinalIgnoreCase) ||
                p.Brand.Contains(searchLower, StringComparison.OrdinalIgnoreCase) ||
                p.Description.Contains(searchLower, StringComparison.OrdinalIgnoreCase));
        }

        // Get total before pagination
        var totalCount = query.Count();

        // Apply sorting
        query = filter.SortBy?.ToLower() switch
        {
            "price" => filter.SortDescending
                ? query.OrderByDescending(p => p.Price)
                : query.OrderBy(p => p.Price),
            "rating" => filter.SortDescending
                ? query.OrderByDescending(p => p.Rating)
                : query.OrderBy(p => p.Rating),
            "name" => filter.SortDescending
                ? query.OrderByDescending(p => p.Name)
                : query.OrderBy(p => p.Name),
            "newest" => query.OrderByDescending(p => p.IsNew).ThenByDescending(p => p.CreatedAt),
            _ => query.OrderByDescending(p => p.IsFeatured).ThenByDescending(p => p.Rating)
        };

        // Apply pagination
        var page = Math.Max(1, filter.Page);
        var pageSize = Math.Clamp(filter.PageSize, 1, 500);
        var products = query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        var response = new ProductListResponse
        {
            Products = products,
            TotalCount = totalCount,
            Page = page,
            PageSize = pageSize,
            TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
            AvailableBrands = _products.Select(p => p.Brand).Distinct().OrderBy(b => b).ToList()
        };

        return Task.FromResult(response);
    }

    public Task<Product?> GetProductByIdAsync(string id)
    {
        var product = _products.FirstOrDefault(p =>
            p.Id.Equals(id, StringComparison.OrdinalIgnoreCase));
        return Task.FromResult(product);
    }

    public Task<List<string>> GetBrandsAsync()
    {
        var brands = _products
            .Select(p => p.Brand)
            .Distinct()
            .OrderBy(b => b)
            .ToList();
        return Task.FromResult(brands);
    }

    public Task<List<Product>> GetFeaturedProductsAsync(int limit = 4)
    {
        var featured = _products
            .Where(p => p.IsFeatured)
            .OrderByDescending(p => p.Rating)
            .Take(limit)
            .ToList();
        return Task.FromResult(featured);
    }
}
