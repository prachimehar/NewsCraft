package com.newscraft.dto;

import java.util.Arrays;

public enum CountryCode {
    AE("ae", "United Arab Emirates"),
    AR("ar", "Argentina"),
    AT("at", "Austria"),
    AU("au", "Australia"),
    BE("be", "Belgium"),
    BG("bg", "Bulgaria"),
    BR("br", "Brazil"),
    CA("ca", "Canada"),
    CH("ch", "Switzerland"),
    CN("cn", "China"),
    CO("co", "Colombia"),
    CU("cu", "Cuba"),
    CZ("cz", "Czech Republic"),
    DE("de", "Germany"),
    EG("eg", "Egypt"),
    FR("fr", "France"),
    GB("gb", "United Kingdom"),
    GR("gr", "Greece"),
    HK("hk", "Hong Kong"),
    HU("hu", "Hungary"),
    ID("id", "Indonesia"),
    IE("ie", "Ireland"),
    IL("il", "Israel"),
    IN("in", "India"),
    IT("it", "Italy"),
    JP("jp", "Japan"),
    KR("kr", "South Korea"),
    LT("lt", "Lithuania"),
    LV("lv", "Latvia"),
    MA("ma", "Morocco"),
    MX("mx", "Mexico"),
    MY("my", "Malaysia"),
    NG("ng", "Nigeria"),
    NL("nl", "Netherlands"),
    NO("no", "Norway"),
    NZ("nz", "New Zealand"),
    PH("ph", "Philippines"),
    PL("pl", "Poland"),
    PT("pt", "Portugal"),
    RO("ro", "Romania"),
    RS("rs", "Serbia"),
    RU("ru", "Russia"),
    SA("sa", "Saudi Arabia"),
    SE("se", "Sweden"),
    SG("sg", "Singapore"),
    SI("si", "Slovenia"),
    SK("sk", "Slovakia"),
    TH("th", "Thailand"),
    TR("tr", "Turkey"),
    TW("tw", "Taiwan"),
    UA("ua", "Ukraine"),
    US("us", "United States"),
    VE("ve", "Venezuela"),
    ZA("za", "South Africa");

    private final String apiCode;
    private final String displayName;

    CountryCode(String apiCode, String displayName) {
        this.apiCode = apiCode;
        this.displayName = displayName;
    }

    public String apiCode() {
        return apiCode;
    }

    public String displayName() {
        return displayName;
    }

    public static CountryCode from(String value) {
        if (value == null || value.isBlank()) {
            return IN;
        }

        return Arrays.stream(values())
                .filter(country -> country.apiCode.equalsIgnoreCase(value) || country.name().equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unsupported country code: " + value));
    }
}
