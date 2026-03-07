using Snowboard.Calculator.Api.Models;
using Snowboard.Calculator.Api.Services;

namespace Snowboard.Calculator.Api.Endpoints;

public static class ProductEndpoints
{
    public static void MapProductEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/products")
            .WithTags("Products")
            .WithOpenApi();

        group.MapGet("/", HandleGetProducts)
            .WithName("GetProducts")
            .WithSummary("Get all products with optional filters");

        group.MapGet("/{id}", HandleGetProductById)
            .WithName("GetProductById")
            .WithSummary("Get a single product by ID");

        group.MapGet("/featured", HandleGetFeaturedProducts)
            .WithName("GetFeaturedProducts")
            .WithSummary("Get featured products");

        group.MapGet("/brands", HandleGetBrands)
            .WithName("GetBrands")
            .WithSummary("Get all available brands");

        group.MapGet("/categories", HandleGetCategories)
            .WithName("GetCategories")
            .WithSummary("Get all product categories");
    }

    private static async Task<IResult> HandleGetProducts(
        IProductService productService,
        ProductCategory? category = null,
        string? brand = null,
        decimal? minPrice = null,
        decimal? maxPrice = null,
        bool? inStock = null,
        bool? featured = null,
        string? search = null,
        string? sortBy = null,
        bool sortDesc = false,
        int page = 1,
        int pageSize = 12)
    {
        var filter = new ProductFilter
        {
            Category = category,
            Brand = brand,
            MinPrice = minPrice,
            MaxPrice = maxPrice,
            InStock = inStock,
            IsFeatured = featured,
            Search = search,
            SortBy = sortBy,
            SortDescending = sortDesc,
            Page = page,
            PageSize = pageSize
        };

        var result = await productService.GetProductsAsync(filter);
        return Results.Ok(result);
    }

    private static async Task<IResult> HandleGetProductById(
        IProductService productService,
        string id)
    {
        var product = await productService.GetProductByIdAsync(id);

        if (product == null)
        {
            return Results.NotFound(new { Message = $"Product with ID '{id}' not found" });
        }

        return Results.Ok(product);
    }

    private static async Task<IResult> HandleGetFeaturedProducts(
        IProductService productService,
        int limit = 4)
    {
        var products = await productService.GetFeaturedProductsAsync(limit);
        return Results.Ok(products);
    }

    private static Task<IResult> HandleGetBrands(IProductService productService)
    {
        var brands = productService.GetBrandsAsync();
        return Task.FromResult(Results.Ok(brands));
    }

    private static Task<IResult> HandleGetCategories()
    {
        var categories = Enum.GetNames<ProductCategory>();
        return Task.FromResult(Results.Ok(categories));
    }
}
