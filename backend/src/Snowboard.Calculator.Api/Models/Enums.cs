namespace Snowboard.Calculator.Api.Models;

public enum RidingStyle
{
    AllMountain,    // Genel kullanım
    Freestyle,      // Park, trick
    Freeride,       // Derin kar, off-piste
    Powder,         // Toz kar
    Carving         // Pist, hız
}

public enum ExperienceLevel
{
    Beginner,       // Yeni başlayan
    Intermediate,   // Orta seviye
    Advanced,       // İleri seviye
    Expert          // Uzman
}

public enum BootFlex
{
    Soft,           // 1-4: Beginner, Freestyle
    Medium,         // 5-7: All-mountain, Intermediate
    Stiff           // 8-10: Freeride, Expert
}

public enum Gender
{
    Male,
    Female,
    Unisex
}
