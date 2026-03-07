namespace Snowboard.Calculator.Api.Models;

public record Product
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public required string Brand { get; init; }
    public required ProductCategory Category { get; init; }
    public required decimal Price { get; init; }
    public decimal? OriginalPrice { get; init; }
    public required string Currency { get; init; } = "USD";
    public double Rating { get; init; }
    public int ReviewCount { get; init; }
    public required string Description { get; init; }
    public string? DescriptionTr { get; init; }
    public required List<string> Features { get; init; }
    public List<string>? FeaturesTr { get; init; }
    public required string ImageUrl { get; init; }
    public List<string>? GalleryImages { get; init; }
    public string? AffiliateUrl { get; init; }
    public bool InStock { get; init; } = true;
    public bool IsFeatured { get; init; }
    public bool IsNew { get; init; }
    public bool IsBestSeller { get; init; }
    public ProductSpecs? Specs { get; init; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}

public record ProductSpecs
{
    // Snowboard specs
    public string? Length { get; init; }
    public string? Width { get; init; }
    public string? Profile { get; init; }  // Camber, Rocker, Flat
    public string? Flex { get; init; }     // Soft, Medium, Stiff
    public string? Shape { get; init; }    // Twin, Directional, Directional Twin
    public string? Terrain { get; init; }  // All-Mountain, Freestyle, Freeride, Powder

    // Boot specs
    public string? BootSize { get; init; }
    public string? LacingSystem { get; init; }  // BOA, Speed Zone, Traditional
    public string? Liner { get; init; }

    // Binding specs
    public string? BindingSize { get; init; }
    public string? BaseplateType { get; init; }  // Re:Flex, EST, Channel
    public string? Response { get; init; }

    // General
    public string? Material { get; init; }
    public string? Weight { get; init; }
}

public enum ProductCategory
{
    Snowboard,
    Boot,
    Binding,
    Helmet,
    Goggle,
    Jacket,
    Pants,
    Gloves,
    Accessory
}

public record ProductFilter
{
    public ProductCategory? Category { get; init; }
    public string? Brand { get; init; }
    public decimal? MinPrice { get; init; }
    public decimal? MaxPrice { get; init; }
    public bool? InStock { get; init; }
    public bool? IsFeatured { get; init; }
    public string? Search { get; init; }
    public string? SortBy { get; init; }  // price, rating, name, newest
    public bool SortDescending { get; init; }
    public int Page { get; init; } = 1;
    public int PageSize { get; init; } = 12;
}

public record ProductListResponse
{
    public required List<Product> Products { get; init; }
    public int TotalCount { get; init; }
    public int Page { get; init; }
    public int PageSize { get; init; }
    public int TotalPages { get; init; }
    public List<string> AvailableBrands { get; init; } = [];
}
