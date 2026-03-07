namespace Snowboard.Calculator.Api.Models;

public record EquipmentRecommendation
{
    public SnowboardRecommendation Snowboard { get; init; } = null!;
    public BootRecommendation Boot { get; init; } = null!;
    public BindingRecommendation Binding { get; init; } = null!;
    public decimal TotalPrice { get; init; }
    public string[] Tips { get; init; } = Array.Empty<string>();
}

public record SnowboardRecommendation
{
    public SnowboardSpec Spec { get; init; } = null!;
    public int RecommendedLength { get; init; }
    public int MinLength { get; init; }
    public int MaxLength { get; init; }
    public string SizeExplanation { get; init; } = string.Empty;
    public double MatchScore { get; init; } // 0-100
    public string[] Reasons { get; init; } = Array.Empty<string>();
}

public record BootRecommendation
{
    public BootSpec Spec { get; init; } = null!;
    public double RecommendedSize { get; init; }
    public string SizeExplanation { get; init; } = string.Empty;
    public double MatchScore { get; init; }
    public string[] Reasons { get; init; } = Array.Empty<string>();
}

public record BindingRecommendation
{
    public BindingSpec Spec { get; init; } = null!;
    public string RecommendedSize { get; init; } = string.Empty;
    public string SizeExplanation { get; init; } = string.Empty;
    public double MatchScore { get; init; }
    public string[] Reasons { get; init; } = Array.Empty<string>();
}

public record RecommendationResponse
{
    public bool Success { get; init; }
    public UserProfile Profile { get; init; } = null!;
    public EquipmentRecommendation[] Recommendations { get; init; } = Array.Empty<EquipmentRecommendation>();
    public SizeCalculation SizeInfo { get; init; } = null!;
}

public record SizeCalculation
{
    public int RecommendedBoardLength { get; init; }
    public int MinBoardLength { get; init; }
    public int MaxBoardLength { get; init; }
    public int RecommendedWaistWidth { get; init; }
    public string BindingSize { get; init; } = string.Empty;
    public string Explanation { get; init; } = string.Empty;
}

public record ErrorResponse
{
    public string Error { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
}
