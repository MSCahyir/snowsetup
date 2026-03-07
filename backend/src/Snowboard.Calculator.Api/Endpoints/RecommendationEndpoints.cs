using Snowboard.Calculator.Api.Models;
using Snowboard.Calculator.Api.Services;

namespace Snowboard.Calculator.Api.Endpoints;

public static class RecommendationEndpoints
{
    public static void MapRecommendationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/recommendation")
            .WithTags("Recommendation");

        group.MapPost("/", HandleGetRecommendations)
            .WithName("GetRecommendations")
            .WithDescription("Get personalized snowboard equipment recommendations based on user profile")
            .Produces<RecommendationResponse>(StatusCodes.Status200OK)
            .Produces<ErrorResponse>(StatusCodes.Status400BadRequest);

        group.MapPost("/size", HandleCalculateSize)
            .WithName("CalculateSize")
            .WithDescription("Calculate recommended snowboard size based on user measurements")
            .Produces<SizeCalculation>(StatusCodes.Status200OK)
            .Produces<ErrorResponse>(StatusCodes.Status400BadRequest);

        group.MapGet("/styles", HandleGetStyles)
            .WithName("GetStyles")
            .WithDescription("Get available riding styles")
            .Produces<object>(StatusCodes.Status200OK);

        group.MapGet("/levels", HandleGetLevels)
            .WithName("GetLevels")
            .WithDescription("Get available experience levels")
            .Produces<object>(StatusCodes.Status200OK);
    }

    private static IResult HandleGetRecommendations(
        RecommendationRequest request,
        IRecommendationService service)
    {
        try
        {
            var result = service.GetRecommendations(request);
            return Results.Ok(result);
        }
        catch (Exception ex)
        {
            return Results.BadRequest(new ErrorResponse
            {
                Error = "RecommendationError",
                Message = ex.Message
            });
        }
    }

    private static IResult HandleCalculateSize(
        UserProfile profile,
        IRecommendationService service)
    {
        try
        {
            var result = service.CalculateSizes(profile);
            return Results.Ok(result);
        }
        catch (Exception ex)
        {
            return Results.BadRequest(new ErrorResponse
            {
                Error = "CalculationError",
                Message = ex.Message
            });
        }
    }

    private static IResult HandleGetStyles()
    {
        var styles = Enum.GetValues<RidingStyle>()
            .Select(s => new
            {
                Value = s.ToString(),
                Label = GetStyleLabel(s),
                Description = GetStyleDescription(s)
            });
        return Results.Ok(styles);
    }

    private static IResult HandleGetLevels()
    {
        var levels = Enum.GetValues<ExperienceLevel>()
            .Select(l => new
            {
                Value = l.ToString(),
                Label = GetLevelLabel(l),
                Description = GetLevelDescription(l)
            });
        return Results.Ok(levels);
    }

    private static string GetStyleLabel(RidingStyle style) => style switch
    {
        RidingStyle.AllMountain => "All-Mountain",
        RidingStyle.Freestyle => "Freestyle / Park",
        RidingStyle.Freeride => "Freeride / Backcountry",
        RidingStyle.Powder => "Powder",
        RidingStyle.Carving => "Carving / Pist",
        _ => style.ToString()
    };

    private static string GetStyleDescription(RidingStyle style) => style switch
    {
        RidingStyle.AllMountain => "Her yerde kullanım - pist, kar, park",
        RidingStyle.Freestyle => "Park, jump, trick ve rail",
        RidingStyle.Freeride => "Derin kar, off-piste, backcountry",
        RidingStyle.Powder => "Toz kar, derin kar",
        RidingStyle.Carving => "Pist kayağı, hız ve keskin dönüşler",
        _ => ""
    };

    private static string GetLevelLabel(ExperienceLevel level) => level switch
    {
        ExperienceLevel.Beginner => "Yeni Başlayan",
        ExperienceLevel.Intermediate => "Orta Seviye",
        ExperienceLevel.Advanced => "İleri Seviye",
        ExperienceLevel.Expert => "Uzman",
        _ => level.ToString()
    };

    private static string GetLevelDescription(ExperienceLevel level) => level switch
    {
        ExperienceLevel.Beginner => "İlk sezonu veya birkaç gün deneyimli",
        ExperienceLevel.Intermediate => "Temel teknikleri biliyor, mavi pistlerde rahat",
        ExperienceLevel.Advanced => "Tüm pistlerde rahat, park deneyimi var",
        ExperienceLevel.Expert => "Her koşulda kayabiliyor, trick yapabiliyor",
        _ => ""
    };
}
