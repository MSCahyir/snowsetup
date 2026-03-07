using Snowboard.Calculator.Api.Models;

namespace Snowboard.Calculator.Api.Services;

public interface IRecommendationService
{
    RecommendationResponse GetRecommendations(RecommendationRequest request);
    SizeCalculation CalculateSizes(UserProfile profile);
}
