namespace Snowboard.Calculator.Api.Models;

public record SnowboardSpec
{
    public string Id { get; init; } = string.Empty;
    public string Brand { get; init; } = string.Empty;
    public string Model { get; init; } = string.Empty;
    public int LengthCm { get; init; }
    public int WaistWidthMm { get; init; }
    public RidingStyle[] SuitableStyles { get; init; } = Array.Empty<RidingStyle>();
    public ExperienceLevel[] SuitableLevels { get; init; } = Array.Empty<ExperienceLevel>();
    public Gender Gender { get; init; }
    public string Profile { get; init; } = string.Empty; // Camber, Rocker, Hybrid
    public string Flex { get; init; } = string.Empty; // Soft, Medium, Stiff
    public decimal Price { get; init; }
    public string ImageUrl { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
}

public record BootSpec
{
    public string Id { get; init; } = string.Empty;
    public string Brand { get; init; } = string.Empty;
    public string Model { get; init; } = string.Empty;
    public double[] AvailableSizes { get; init; } = Array.Empty<double>();
    public BootFlex Flex { get; init; }
    public int FlexRating { get; init; } // 1-10
    public RidingStyle[] SuitableStyles { get; init; } = Array.Empty<RidingStyle>();
    public ExperienceLevel[] SuitableLevels { get; init; } = Array.Empty<ExperienceLevel>();
    public Gender Gender { get; init; }
    public string LacingSystem { get; init; } = string.Empty; // BOA, Speed Lace, Traditional
    public decimal Price { get; init; }
    public string ImageUrl { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
}

public record BindingSpec
{
    public string Id { get; init; } = string.Empty;
    public string Brand { get; init; } = string.Empty;
    public string Model { get; init; } = string.Empty;
    public string[] AvailableSizes { get; init; } = Array.Empty<string>(); // S, M, L
    public string Flex { get; init; } = string.Empty; // Soft, Medium, Stiff
    public int FlexRating { get; init; } // 1-10
    public RidingStyle[] SuitableStyles { get; init; } = Array.Empty<RidingStyle>();
    public ExperienceLevel[] SuitableLevels { get; init; } = Array.Empty<ExperienceLevel>();
    public Gender Gender { get; init; }
    public decimal Price { get; init; }
    public string ImageUrl { get; init; } = string.Empty;
    public string Description { get; init; } = string.Empty;
}
