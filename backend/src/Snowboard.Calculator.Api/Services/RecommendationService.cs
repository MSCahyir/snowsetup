using Snowboard.Calculator.Api.Models;

namespace Snowboard.Calculator.Api.Services;

public class RecommendationService : IRecommendationService
{
    private readonly IProductService _productService;
    private List<SnowboardSpec> _snowboards = new();
    private List<BootSpec> _boots = new();
    private List<BindingSpec> _bindings = new();
    private bool _isLoaded = false;

    public RecommendationService(IProductService productService)
    {
        _productService = productService;
    }

    private void EnsureProductsLoaded()
    {
        if (_isLoaded) return;
        _isLoaded = true;
        LoadProductsFromService();
    }

    private void LoadProductsFromService()
    {
        try
        {
            var filter = new ProductFilter { PageSize = 200 };
            var result = _productService.GetProductsAsync(filter).GetAwaiter().GetResult();

            Console.WriteLine($"[RecommendationService] Loaded {result.Products.Count} products from ProductService");

            foreach (var product in result.Products)
            {
                switch (product.Category)
                {
                    case ProductCategory.Snowboard:
                        _snowboards.Add(MapToSnowboardSpec(product));
                        break;
                    case ProductCategory.Boot:
                        _boots.Add(MapToBootSpec(product));
                        break;
                    case ProductCategory.Binding:
                        _bindings.Add(MapToBindingSpec(product));
                        break;
                }
            }

            Console.WriteLine($"[RecommendationService] Mapped: {_snowboards.Count} snowboards, {_boots.Count} boots, {_bindings.Count} bindings");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[RecommendationService] Error loading products: {ex.Message}");
        }

        // Ensure we have at least some data
        if (_snowboards.Count == 0) _snowboards = GetFallbackSnowboards();
        if (_boots.Count == 0) _boots = GetFallbackBoots();
        if (_bindings.Count == 0) _bindings = GetFallbackBindings();
    }

    private SnowboardSpec MapToSnowboardSpec(Product product)
    {
        var nameLower = product.Name.ToLower();

        // Infer specs from product name
        var isWide = nameLower.Contains("wide");
        var isFreestyle = nameLower.Contains("freestyle") || nameLower.Contains("park") || nameLower.Contains("jib");
        var isFreeride = nameLower.Contains("freeride") || nameLower.Contains("powder") || nameLower.Contains("backcountry");
        var isWomens = nameLower.Contains("women") || nameLower.Contains("kadın") || nameLower.Contains("wmn");

        // Infer flex from name
        var flex = "Medium";
        if (nameLower.Contains("soft") || nameLower.Contains("beginner") || nameLower.Contains("başlangıç"))
            flex = "Soft";
        else if (nameLower.Contains("stiff") || nameLower.Contains("pro") || nameLower.Contains("expert"))
            flex = "Stiff";

        // Infer profile
        var profile = "Hybrid";
        if (nameLower.Contains("camber"))
            profile = "Camber";
        else if (nameLower.Contains("rocker") || nameLower.Contains("banana"))
            profile = "Rocker";
        else if (nameLower.Contains("flat"))
            profile = "Flat";

        // Default riding styles based on name keywords
        var styles = new List<RidingStyle> { RidingStyle.AllMountain };
        if (isFreestyle) styles.Add(RidingStyle.Freestyle);
        if (isFreeride) { styles.Add(RidingStyle.Freeride); styles.Add(RidingStyle.Powder); }

        // Default experience levels
        var levels = new List<ExperienceLevel> { ExperienceLevel.Intermediate, ExperienceLevel.Advanced };
        if (flex == "Soft") levels.Insert(0, ExperienceLevel.Beginner);
        if (flex == "Stiff") { levels.Remove(ExperienceLevel.Beginner); levels.Add(ExperienceLevel.Expert); }

        return new SnowboardSpec
        {
            Id = product.Id,
            Brand = product.Brand,
            Model = product.Name.Replace(product.Brand, "").Trim(),
            LengthCm = 156, // Default, real size from specs if available
            WaistWidthMm = isWide ? 260 : 252,
            SuitableStyles = styles.Distinct().ToArray(),
            SuitableLevels = levels.Distinct().ToArray(),
            Gender = isWomens ? Gender.Female : Gender.Unisex,
            Profile = profile,
            Flex = flex,
            Price = product.Price,
            ImageUrl = product.ImageUrl,
            Description = product.Description
        };
    }

    private BootSpec MapToBootSpec(Product product)
    {
        var nameLower = product.Name.ToLower();

        var isWomens = nameLower.Contains("women") || nameLower.Contains("kadın") || nameLower.Contains("wmn");
        var isStiff = nameLower.Contains("stiff") || nameLower.Contains("pro") || nameLower.Contains("ion");
        var isSoft = nameLower.Contains("soft") || nameLower.Contains("beginner");

        var flexType = BootFlex.Medium;
        var flexRating = 5;
        if (isStiff) { flexType = BootFlex.Stiff; flexRating = 8; }
        else if (isSoft) { flexType = BootFlex.Soft; flexRating = 3; }

        var lacingSystem = "BOA";
        if (nameLower.Contains("speed") || nameLower.Contains("quick"))
            lacingSystem = "Speed Zone";
        else if (nameLower.Contains("traditional") || nameLower.Contains("lace"))
            lacingSystem = "Traditional";

        return new BootSpec
        {
            Id = product.Id,
            Brand = product.Brand,
            Model = product.Name.Replace(product.Brand, "").Trim(),
            AvailableSizes = isWomens
                ? new[] { 36.0, 37.0, 38.0, 39.0, 40.0, 41.0, 42.0 }
                : new[] { 40.0, 41.0, 42.0, 43.0, 44.0, 45.0, 46.0 },
            Flex = flexType,
            FlexRating = flexRating,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = isSoft
                ? new[] { ExperienceLevel.Beginner, ExperienceLevel.Intermediate }
                : new[] { ExperienceLevel.Intermediate, ExperienceLevel.Advanced },
            Gender = isWomens ? Gender.Female : Gender.Unisex,
            LacingSystem = lacingSystem,
            Price = product.Price,
            ImageUrl = product.ImageUrl,
            Description = product.Description
        };
    }

    private BindingSpec MapToBindingSpec(Product product)
    {
        var nameLower = product.Name.ToLower();

        var isWomens = nameLower.Contains("women") || nameLower.Contains("kadın") || nameLower.Contains("wmn");
        var isStiff = nameLower.Contains("stiff") || nameLower.Contains("pro") || nameLower.Contains("x ");
        var isSoft = nameLower.Contains("soft") || nameLower.Contains("beginner");

        var flex = "Medium";
        var flexRating = 5;
        if (isStiff) { flex = "Stiff"; flexRating = 7; }
        else if (isSoft) { flex = "Soft"; flexRating = 3; }

        return new BindingSpec
        {
            Id = product.Id,
            Brand = product.Brand,
            Model = product.Name.Replace(product.Brand, "").Trim(),
            AvailableSizes = isWomens ? new[] { "S", "M" } : new[] { "S", "M", "L", "XL" },
            Flex = flex,
            FlexRating = flexRating,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = isSoft
                ? new[] { ExperienceLevel.Beginner, ExperienceLevel.Intermediate }
                : new[] { ExperienceLevel.Intermediate, ExperienceLevel.Advanced },
            Gender = isWomens ? Gender.Female : Gender.Unisex,
            Price = product.Price,
            ImageUrl = product.ImageUrl,
            Description = product.Description
        };
    }

    public SizeCalculation CalculateSizes(UserProfile profile)
    {
        // Board length calculation based on height, weight, and style
        int baseLength = CalculateBaseBoardLength(profile.HeightCm, profile.WeightKg);
        int adjustedLength = AdjustLengthForStyle(baseLength, profile.PreferredStyle, profile.Experience);

        int minLength = adjustedLength - 5;
        int maxLength = adjustedLength + 5;

        // Waist width based on boot size
        int waistWidth = CalculateWaistWidth(profile.BootSize);

        // Binding size based on boot size
        string bindingSize = CalculateBindingSize(profile.BootSize);

        string explanation = GenerateSizeExplanation(profile, adjustedLength, waistWidth);

        return new SizeCalculation
        {
            RecommendedBoardLength = adjustedLength,
            MinBoardLength = minLength,
            MaxBoardLength = maxLength,
            RecommendedWaistWidth = waistWidth,
            BindingSize = bindingSize,
            Explanation = explanation
        };
    }

    public RecommendationResponse GetRecommendations(RecommendationRequest request)
    {
        EnsureProductsLoaded();

        var profile = request.Profile;
        var sizeInfo = CalculateSizes(profile);

        var recommendations = new List<EquipmentRecommendation>();

        // Find matching equipment
        var matchingBoards = FindMatchingSnowboards(profile, sizeInfo, request.MaxBudget);
        var matchingBoots = FindMatchingBoots(profile, request.MaxBudget);
        var matchingBindings = FindMatchingBindings(profile, request.MaxBudget);

        // If no matches found, return all available
        if (matchingBoots.Count == 0 && _boots.Count > 0)
        {
            matchingBoots = _boots.Select(b => new BootRecommendation
            {
                Spec = b,
                RecommendedSize = profile.BootSize,
                SizeExplanation = "Snowboard botları normal ayakkabı numaranızla aynı veya yarım numara küçük olmalı.",
                MatchScore = 50,
                Reasons = new[] { "Boyutunuza yakın model" }
            }).Take(5).ToList();
        }

        if (matchingBindings.Count == 0 && _bindings.Count > 0)
        {
            var targetSize = CalculateBindingSize(profile.BootSize);
            matchingBindings = _bindings.Select(b => new BindingRecommendation
            {
                Spec = b,
                RecommendedSize = targetSize,
                SizeExplanation = $"Bot numaranıza ({profile.BootSize}) göre {targetSize} beden önerilir.",
                MatchScore = 50,
                Reasons = new[] { "Bedeninize uygun model" }
            }).Take(5).ToList();
        }

        // Create recommendation sets (top 3 combinations)
        for (int i = 0; i < Math.Min(3, matchingBoards.Count); i++)
        {
            var board = matchingBoards[i];
            var bootIndex = Math.Min(i, matchingBoots.Count - 1);
            var bindingIndex = Math.Min(i, matchingBindings.Count - 1);

            if (bootIndex < 0 || bindingIndex < 0) continue;

            var boot = matchingBoots[bootIndex];
            var binding = matchingBindings[bindingIndex];

            recommendations.Add(new EquipmentRecommendation
            {
                Snowboard = board,
                Boot = boot,
                Binding = binding,
                TotalPrice = board.Spec.Price + boot.Spec.Price + binding.Spec.Price,
                Tips = GenerateTips(profile, board, boot, binding)
            });
        }

        return new RecommendationResponse
        {
            Success = true,
            Profile = profile,
            Recommendations = recommendations.ToArray(),
            SizeInfo = sizeInfo
        };
    }

    private int CalculateBaseBoardLength(int heightCm, int weightKg)
    {
        // Classic formula: chin to nose height
        // Board should be between chin (height - 25cm) and nose (height - 15cm)
        int baseFromHeight = heightCm - 20;

        // Weight adjustment: heavier riders need longer boards
        int weightAdjustment = 0;
        if (weightKg > 80) weightAdjustment = (weightKg - 80) / 5;
        else if (weightKg < 60) weightAdjustment = (weightKg - 60) / 5;

        return baseFromHeight + weightAdjustment;
    }

    private int AdjustLengthForStyle(int baseLength, RidingStyle style, ExperienceLevel experience)
    {
        int adjustment = 0;

        // Style adjustments
        adjustment += style switch
        {
            RidingStyle.Freestyle => -3,      // Shorter for maneuverability
            RidingStyle.Freeride => +3,       // Longer for stability
            RidingStyle.Powder => +5,         // Longer for float
            RidingStyle.Carving => +2,        // Slightly longer for edge hold
            RidingStyle.AllMountain => 0,     // Neutral
            _ => 0
        };

        // Experience adjustments
        adjustment += experience switch
        {
            ExperienceLevel.Beginner => -3,       // Shorter, easier to control
            ExperienceLevel.Intermediate => 0,    // Standard
            ExperienceLevel.Advanced => +2,       // Can handle longer
            ExperienceLevel.Expert => +3,         // Prefer longer for speed
            _ => 0
        };

        return baseLength + adjustment;
    }

    private int CalculateWaistWidth(double bootSize)
    {
        // Waist width in mm based on boot size
        // Goal: minimal toe/heel drag
        return bootSize switch
        {
            < 40 => 245,      // Narrow
            < 43 => 250,      // Regular
            < 45 => 255,      // Mid-wide
            < 47 => 260,      // Wide
            _ => 265          // Extra wide
        };
    }

    private string CalculateBindingSize(double bootSize)
    {
        return bootSize switch
        {
            < 38 => "S",
            < 42 => "M",
            < 45 => "L",
            _ => "XL"
        };
    }

    private string GenerateSizeExplanation(UserProfile profile, int boardLength, int waistWidth)
    {
        var explanations = new List<string>
        {
            $"Boyunuza ({profile.HeightCm} cm) ve kilonuza ({profile.WeightKg} kg) göre temel board uzunluğu hesaplandı."
        };

        if (profile.PreferredStyle == RidingStyle.Freestyle)
            explanations.Add("Freestyle için biraz daha kısa board önerildi - manevra kabiliyeti artacak.");
        else if (profile.PreferredStyle == RidingStyle.Powder)
            explanations.Add("Powder için daha uzun board önerildi - kar üzerinde daha iyi yüzeceksiniz.");

        if (profile.Experience == ExperienceLevel.Beginner)
            explanations.Add("Yeni başlayan olarak daha kısa board kontrol etmesi daha kolay olacak.");

        explanations.Add($"Ayak numaranıza ({profile.BootSize}) göre minimum {waistWidth}mm genişlikte board önerilir.");

        return string.Join(" ", explanations);
    }

    private List<SnowboardRecommendation> FindMatchingSnowboards(UserProfile profile, SizeCalculation sizeInfo, decimal? maxBudget)
    {
        var results = new List<SnowboardRecommendation>();

        foreach (var board in _snowboards)
        {
            // Filter by gender
            if (board.Gender != Gender.Unisex && board.Gender != profile.Gender)
                continue;

            // Filter by budget
            if (maxBudget.HasValue && board.Price > maxBudget.Value)
                continue;

            // Filter by size (board length should be close to recommended)
            if (board.LengthCm < sizeInfo.MinBoardLength - 5 || board.LengthCm > sizeInfo.MaxBoardLength + 5)
                continue;

            // Filter by waist width
            if (board.WaistWidthMm < sizeInfo.RecommendedWaistWidth - 10)
                continue;

            // Calculate match score
            double score = CalculateBoardMatchScore(board, profile, sizeInfo);

            var reasons = GenerateBoardReasons(board, profile, sizeInfo);

            results.Add(new SnowboardRecommendation
            {
                Spec = board,
                RecommendedLength = sizeInfo.RecommendedBoardLength,
                MinLength = sizeInfo.MinBoardLength,
                MaxLength = sizeInfo.MaxBoardLength,
                SizeExplanation = $"{sizeInfo.MinBoardLength}-{sizeInfo.MaxBoardLength} cm aralığı sizin için ideal.",
                MatchScore = score,
                Reasons = reasons
            });
        }

        return results.OrderByDescending(r => r.MatchScore).ToList();
    }

    private double CalculateBoardMatchScore(SnowboardSpec board, UserProfile profile, SizeCalculation sizeInfo)
    {
        double score = 50; // Base score

        // Style match (0-25 points)
        if (board.SuitableStyles.Contains(profile.PreferredStyle))
            score += 25;
        else if (board.SuitableStyles.Contains(RidingStyle.AllMountain))
            score += 15;

        // Experience match (0-15 points)
        if (board.SuitableLevels.Contains(profile.Experience))
            score += 15;
        else if (board.SuitableLevels.Any(l => Math.Abs((int)l - (int)profile.Experience) <= 1))
            score += 8;

        // Size match (0-10 points)
        int sizeDiff = Math.Abs(board.LengthCm - sizeInfo.RecommendedBoardLength);
        score += Math.Max(0, 10 - sizeDiff);

        return Math.Min(100, score);
    }

    private string[] GenerateBoardReasons(SnowboardSpec board, UserProfile profile, SizeCalculation sizeInfo)
    {
        var reasons = new List<string>();

        if (board.SuitableStyles.Contains(profile.PreferredStyle))
            reasons.Add($"{profile.PreferredStyle} stili için ideal");

        if (board.SuitableLevels.Contains(profile.Experience))
            reasons.Add($"{profile.Experience} seviye için uygun");

        reasons.Add($"{board.Profile} profili - {GetProfileDescription(board.Profile)}");
        reasons.Add($"{board.Flex} flex - {GetFlexDescription(board.Flex)}");

        return reasons.ToArray();
    }

    private List<BootRecommendation> FindMatchingBoots(UserProfile profile, decimal? maxBudget)
    {
        var results = new List<BootRecommendation>();

        foreach (var boot in _boots)
        {
            if (boot.Gender != Gender.Unisex && boot.Gender != profile.Gender)
                continue;

            if (maxBudget.HasValue && boot.Price > maxBudget.Value)
                continue;

            if (!boot.AvailableSizes.Any(s => Math.Abs(s - profile.BootSize) <= 0.5))
                continue;

            double score = CalculateBootMatchScore(boot, profile);

            results.Add(new BootRecommendation
            {
                Spec = boot,
                RecommendedSize = profile.BootSize,
                SizeExplanation = "Snowboard botları normal ayakkabı numaranızla aynı veya yarım numara küçük olmalı.",
                MatchScore = score,
                Reasons = GenerateBootReasons(boot, profile)
            });
        }

        return results.OrderByDescending(r => r.MatchScore).ToList();
    }

    private double CalculateBootMatchScore(BootSpec boot, UserProfile profile)
    {
        double score = 50;

        if (boot.SuitableStyles.Contains(profile.PreferredStyle))
            score += 25;

        if (boot.SuitableLevels.Contains(profile.Experience))
            score += 15;

        // Flex match
        var idealFlex = GetIdealBootFlex(profile);
        if (boot.Flex == idealFlex)
            score += 10;

        return Math.Min(100, score);
    }

    private BootFlex GetIdealBootFlex(UserProfile profile)
    {
        return (profile.Experience, profile.PreferredStyle) switch
        {
            (ExperienceLevel.Beginner, _) => BootFlex.Soft,
            (_, RidingStyle.Freestyle) => BootFlex.Soft,
            (ExperienceLevel.Expert, RidingStyle.Freeride) => BootFlex.Stiff,
            (ExperienceLevel.Expert, RidingStyle.Carving) => BootFlex.Stiff,
            _ => BootFlex.Medium
        };
    }

    private string[] GenerateBootReasons(BootSpec boot, UserProfile profile)
    {
        var reasons = new List<string>
        {
            $"Flex {boot.FlexRating}/10 - {GetBootFlexDescription(boot.Flex)}",
            $"{boot.LacingSystem} bağlama sistemi"
        };

        if (boot.SuitableStyles.Contains(profile.PreferredStyle))
            reasons.Add($"{profile.PreferredStyle} için optimize edilmiş");

        return reasons.ToArray();
    }

    private List<BindingRecommendation> FindMatchingBindings(UserProfile profile, decimal? maxBudget)
    {
        var results = new List<BindingRecommendation>();
        var targetSize = CalculateBindingSize(profile.BootSize);

        foreach (var binding in _bindings)
        {
            if (binding.Gender != Gender.Unisex && binding.Gender != profile.Gender)
                continue;

            if (maxBudget.HasValue && binding.Price > maxBudget.Value)
                continue;

            if (!binding.AvailableSizes.Contains(targetSize))
                continue;

            double score = CalculateBindingMatchScore(binding, profile);

            results.Add(new BindingRecommendation
            {
                Spec = binding,
                RecommendedSize = targetSize,
                SizeExplanation = $"Bot numaranıza ({profile.BootSize}) göre {targetSize} beden önerilir.",
                MatchScore = score,
                Reasons = GenerateBindingReasons(binding, profile)
            });
        }

        return results.OrderByDescending(r => r.MatchScore).ToList();
    }

    private double CalculateBindingMatchScore(BindingSpec binding, UserProfile profile)
    {
        double score = 50;

        if (binding.SuitableStyles.Contains(profile.PreferredStyle))
            score += 25;

        if (binding.SuitableLevels.Contains(profile.Experience))
            score += 15;

        return Math.Min(100, score);
    }

    private string[] GenerateBindingReasons(BindingSpec binding, UserProfile profile)
    {
        var reasons = new List<string>
        {
            $"Flex {binding.FlexRating}/10",
        };

        if (binding.SuitableStyles.Contains(profile.PreferredStyle))
            reasons.Add($"{profile.PreferredStyle} için uygun");

        return reasons.ToArray();
    }

    private string[] GenerateTips(UserProfile profile, SnowboardRecommendation board, BootRecommendation boot, BindingRecommendation binding)
    {
        var tips = new List<string>();

        if (profile.Experience == ExperienceLevel.Beginner)
        {
            tips.Add("İlk board'unuzda çok para harcamayın - tarzınız değişebilir.");
            tips.Add("Botları mağazada deneyip alın - en önemli ekipman botlardır.");
        }

        if (profile.PreferredStyle == RidingStyle.Freestyle)
        {
            tips.Add("Twin tip board seçmeniz trick yapmanızı kolaylaştırır.");
        }

        if (profile.PreferredStyle == RidingStyle.Powder)
        {
            tips.Add("Setback stance powder'da arkaya kaymanızı sağlar.");
        }

        tips.Add("Binding ve board'u aynı marka almak zorunda değilsiniz - çoğu uyumludur.");

        return tips.ToArray();
    }

    private string GetProfileDescription(string profile) => profile switch
    {
        "Camber" => "Piste hakimiyet ve pop için",
        "Rocker" => "Kolay dönüş ve hata affedici",
        "Hybrid" => "Her iki dünyanın en iyisi",
        "Flat" => "Dengeli ve stabil",
        _ => ""
    };

    private string GetFlexDescription(string flex) => flex switch
    {
        "Soft" => "Kolay kontrol, trick'ler için",
        "Medium" => "Çok yönlü kullanım",
        "Stiff" => "Yüksek hız, hassas kontrol",
        _ => ""
    };

    private string GetBootFlexDescription(BootFlex flex) => flex switch
    {
        BootFlex.Soft => "Rahat ve esnek, yeni başlayanlar için ideal",
        BootFlex.Medium => "Dengeli destek, çoğu kayakçı için uygun",
        BootFlex.Stiff => "Maksimum destek ve tepki, uzmanlar için",
        _ => ""
    };

    // Fallback equipment data (used when products.json has no data)
    private List<SnowboardSpec> GetFallbackSnowboards() => new()
    {
        new SnowboardSpec
        {
            Id = "burton-custom",
            Brand = "Burton",
            Model = "Custom",
            LengthCm = 156,
            WaistWidthMm = 252,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = new[] { ExperienceLevel.Intermediate, ExperienceLevel.Advanced },
            Gender = Gender.Male,
            Profile = "Camber",
            Flex = "Medium",
            Price = 599.99m,
            Description = "Efsanevi all-mountain board. Her koşulda mükemmel performans.",
            ImageUrl = "/images/boards/burton-custom.jpg"
        },
        new SnowboardSpec
        {
            Id = "burton-process",
            Brand = "Burton",
            Model = "Process",
            LengthCm = 155,
            WaistWidthMm = 250,
            SuitableStyles = new[] { RidingStyle.Freestyle, RidingStyle.AllMountain },
            SuitableLevels = new[] { ExperienceLevel.Intermediate, ExperienceLevel.Advanced },
            Gender = Gender.Male,
            Profile = "Hybrid",
            Flex = "Soft",
            Price = 499.99m,
            Description = "Park ve all-mountain için mükemmel freestyle board.",
            ImageUrl = "/images/boards/burton-process.jpg"
        },
        new SnowboardSpec
        {
            Id = "jones-flagship",
            Brand = "Jones",
            Model = "Flagship",
            LengthCm = 162,
            WaistWidthMm = 258,
            SuitableStyles = new[] { RidingStyle.Freeride, RidingStyle.Powder },
            SuitableLevels = new[] { ExperienceLevel.Advanced, ExperienceLevel.Expert },
            Gender = Gender.Unisex,
            Profile = "Camber",
            Flex = "Stiff",
            Price = 679.99m,
            Description = "Agresif freeride için tasarlanmış yüksek performanslı board.",
            ImageUrl = "/images/boards/jones-flagship.jpg"
        },
        new SnowboardSpec
        {
            Id = "capita-doa",
            Brand = "Capita",
            Model = "DOA (Defenders of Awesome)",
            LengthCm = 158,
            WaistWidthMm = 254,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = new[] { ExperienceLevel.Intermediate, ExperienceLevel.Advanced, ExperienceLevel.Expert },
            Gender = Gender.Male,
            Profile = "Hybrid",
            Flex = "Medium",
            Price = 549.99m,
            Description = "Ödüllü all-mountain twin tip. Park ve pist arasında mükemmel denge.",
            ImageUrl = "/images/boards/capita-doa.jpg"
        },
        new SnowboardSpec
        {
            Id = "ride-saturday",
            Brand = "Ride",
            Model = "Saturday",
            LengthCm = 147,
            WaistWidthMm = 240,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = new[] { ExperienceLevel.Beginner, ExperienceLevel.Intermediate },
            Gender = Gender.Female,
            Profile = "Hybrid",
            Flex = "Soft",
            Price = 399.99m,
            Description = "Kadınlar için tasarlanmış kolay kontrol edilebilir all-mountain board.",
            ImageUrl = "/images/boards/ride-saturday.jpg"
        },
        new SnowboardSpec
        {
            Id = "burton-ripcord",
            Brand = "Burton",
            Model = "Ripcord",
            LengthCm = 154,
            WaistWidthMm = 250,
            SuitableStyles = new[] { RidingStyle.AllMountain },
            SuitableLevels = new[] { ExperienceLevel.Beginner, ExperienceLevel.Intermediate },
            Gender = Gender.Unisex,
            Profile = "Rocker",
            Flex = "Soft",
            Price = 349.99m,
            Description = "Yeni başlayanlar için ideal, hata affedici flat-top profili.",
            ImageUrl = "/images/boards/burton-ripcord.jpg"
        }
    };

    private List<BootSpec> GetFallbackBoots() => new()
    {
        new BootSpec
        {
            Id = "burton-ion",
            Brand = "Burton",
            Model = "Ion",
            AvailableSizes = new[] { 40.0, 40.5, 41.0, 41.5, 42.0, 42.5, 43.0, 43.5, 44.0, 44.5, 45.0 },
            Flex = BootFlex.Stiff,
            FlexRating = 8,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freeride },
            SuitableLevels = new[] { ExperienceLevel.Advanced, ExperienceLevel.Expert },
            Gender = Gender.Male,
            LacingSystem = "BOA",
            Price = 449.99m,
            Description = "Yüksek performanslı bot, mükemmel tepki ve destek.",
            ImageUrl = "/images/boots/burton-ion.jpg"
        },
        new BootSpec
        {
            Id = "burton-ruler",
            Brand = "Burton",
            Model = "Ruler",
            AvailableSizes = new[] { 40.0, 40.5, 41.0, 41.5, 42.0, 42.5, 43.0, 43.5, 44.0, 44.5, 45.0 },
            Flex = BootFlex.Medium,
            FlexRating = 6,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = new[] { ExperienceLevel.Beginner, ExperienceLevel.Intermediate, ExperienceLevel.Advanced },
            Gender = Gender.Male,
            LacingSystem = "Speed Zone",
            Price = 299.99m,
            Description = "Çok yönlü, rahat ve güvenilir. Her seviye için uygun.",
            ImageUrl = "/images/boots/burton-ruler.jpg"
        },
        new BootSpec
        {
            Id = "thirtytwo-lashed",
            Brand = "ThirtyTwo",
            Model = "Lashed",
            AvailableSizes = new[] { 39.0, 40.0, 41.0, 42.0, 43.0, 44.0, 45.0, 46.0 },
            Flex = BootFlex.Medium,
            FlexRating = 5,
            SuitableStyles = new[] { RidingStyle.Freestyle, RidingStyle.AllMountain },
            SuitableLevels = new[] { ExperienceLevel.Intermediate, ExperienceLevel.Advanced },
            Gender = Gender.Unisex,
            LacingSystem = "Traditional",
            Price = 329.99m,
            Description = "Efsanevi freestyle botu. Rahat ve esnek.",
            ImageUrl = "/images/boots/thirtytwo-lashed.jpg"
        },
        new BootSpec
        {
            Id = "burton-mint",
            Brand = "Burton",
            Model = "Mint",
            AvailableSizes = new[] { 36.0, 37.0, 38.0, 39.0, 40.0, 41.0, 42.0 },
            Flex = BootFlex.Soft,
            FlexRating = 3,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = new[] { ExperienceLevel.Beginner, ExperienceLevel.Intermediate },
            Gender = Gender.Female,
            LacingSystem = "Speed Zone",
            Price = 249.99m,
            Description = "Kadınlar için tasarlanmış rahat ve sıcak bot.",
            ImageUrl = "/images/boots/burton-mint.jpg"
        }
    };

    private List<BindingSpec> GetFallbackBindings() => new()
    {
        new BindingSpec
        {
            Id = "burton-cartel",
            Brand = "Burton",
            Model = "Cartel X",
            AvailableSizes = new[] { "S", "M", "L" },
            Flex = "Medium",
            FlexRating = 6,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = new[] { ExperienceLevel.Intermediate, ExperienceLevel.Advanced, ExperienceLevel.Expert },
            Gender = Gender.Male,
            Price = 329.99m,
            Description = "En çok satan binding. Mükemmel tepki ve konfor dengesi.",
            ImageUrl = "/images/bindings/burton-cartel.jpg"
        },
        new BindingSpec
        {
            Id = "burton-malavita",
            Brand = "Burton",
            Model = "Malavita",
            AvailableSizes = new[] { "S", "M", "L" },
            Flex = "Medium",
            FlexRating = 7,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freeride },
            SuitableLevels = new[] { ExperienceLevel.Advanced, ExperienceLevel.Expert },
            Gender = Gender.Unisex,
            Price = 379.99m,
            Description = "Premium all-mountain binding. Hammock highback teknolojisi.",
            ImageUrl = "/images/bindings/burton-malavita.jpg"
        },
        new BindingSpec
        {
            Id = "union-force",
            Brand = "Union",
            Model = "Force",
            AvailableSizes = new[] { "S", "M", "L", "XL" },
            Flex = "Medium",
            FlexRating = 6,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = new[] { ExperienceLevel.Intermediate, ExperienceLevel.Advanced },
            Gender = Gender.Unisex,
            Price = 289.99m,
            Description = "Güvenilir ve dayanıklı. Freestyle ve all-mountain için ideal.",
            ImageUrl = "/images/bindings/union-force.jpg"
        },
        new BindingSpec
        {
            Id = "burton-citizen",
            Brand = "Burton",
            Model = "Citizen",
            AvailableSizes = new[] { "S", "M" },
            Flex = "Soft",
            FlexRating = 3,
            SuitableStyles = new[] { RidingStyle.AllMountain, RidingStyle.Freestyle },
            SuitableLevels = new[] { ExperienceLevel.Beginner, ExperienceLevel.Intermediate },
            Gender = Gender.Female,
            Price = 199.99m,
            Description = "Kadınlar için hafif ve rahat başlangıç binding'i.",
            ImageUrl = "/images/bindings/burton-citizen.jpg"
        },
        new BindingSpec
        {
            Id = "burton-freestyle",
            Brand = "Burton",
            Model = "Freestyle",
            AvailableSizes = new[] { "S", "M", "L" },
            Flex = "Soft",
            FlexRating = 3,
            SuitableStyles = new[] { RidingStyle.AllMountain },
            SuitableLevels = new[] { ExperienceLevel.Beginner, ExperienceLevel.Intermediate },
            Gender = Gender.Unisex,
            Price = 169.99m,
            Description = "Yeni başlayanlar için ideal, kolay kullanım ve konfor.",
            ImageUrl = "/images/bindings/burton-freestyle.jpg"
        }
    };
}
