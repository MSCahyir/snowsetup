using System.ComponentModel.DataAnnotations;

namespace Snowboard.Calculator.Api.Models;

public record UserProfile
{
    [Required]
    [Range(100, 220, ErrorMessage = "Boy 100-220 cm arasında olmalı")]
    public int HeightCm { get; init; }

    [Required]
    [Range(30, 150, ErrorMessage = "Kilo 30-150 kg arasında olmalı")]
    public int WeightKg { get; init; }

    [Required]
    [Range(35, 50, ErrorMessage = "Ayak numarası 35-50 arasında olmalı")]
    public double BootSize { get; init; }

    [Required]
    public Gender Gender { get; init; }

    [Required]
    public ExperienceLevel Experience { get; init; }

    [Required]
    public RidingStyle PreferredStyle { get; init; }

    public int? Age { get; init; }
}

public record RecommendationRequest
{
    [Required]
    public UserProfile Profile { get; init; } = null!;

    public decimal? MaxBudget { get; init; }
}
