/* Factual summaries and source references only; geometry and simulation are reconstructions. */
(function(root){'use strict';
const data={
  "metadata": {
    "researchDate": "2026-10-26",
    "scope": "Повелитель тайн, первая книга. Все найденные конкретные связи и отдельный каталог неполных сведений.",
    "limitation": "В проверенных источниках нет полной инженерной карты и единого мирового расписания. Координаты городов взяты с фанатской HD-карты; трассировка реконструирована.",
    "timing": "Книжные сроки и отправления хранятся отдельно от игровой модели с пользовательской сеткой 1500 км² на клетку.",
    "sourcePolicy": "Только номера глав, ссылки и пересказы фактов; полный текст книги не включён."
  },
  "sources": [
    {
      "id": "book-213-3456",
      "title": "Повелитель тайн, глава 213",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L3456",
      "chapter": 213,
      "line": 3456,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-126-2020",
      "title": "Повелитель тайн, глава 126",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L2020",
      "chapter": 126,
      "line": 2020,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-12-226",
      "title": "Повелитель тайн, глава 12",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L226",
      "chapter": 12,
      "line": 226,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-56-892",
      "title": "Повелитель тайн, глава 56",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L892",
      "chapter": 56,
      "line": 892,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-17-304",
      "title": "Повелитель тайн, глава 17",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L304",
      "chapter": 17,
      "line": 304,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-406-6710",
      "title": "Повелитель тайн, глава 406",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L6710",
      "chapter": 406,
      "line": 6710,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-731-12265",
      "title": "Повелитель тайн, глава 731",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L12265",
      "chapter": 731,
      "line": 12265,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-732-12279",
      "title": "Повелитель тайн, глава 732",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L12279",
      "chapter": 732,
      "line": 12279,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-975-16147",
      "title": "Повелитель тайн, глава 975",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L16147",
      "chapter": 975,
      "line": 16147,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1333-22234",
      "title": "Повелитель тайн, глава 1333",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L22234",
      "chapter": 1333,
      "line": 22234,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-513-8563",
      "title": "Повелитель тайн, глава 513",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8563",
      "chapter": 513,
      "line": 8563,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1204-19965",
      "title": "Повелитель тайн, глава 1204",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L19965",
      "chapter": 1204,
      "line": 19965,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1280-21327",
      "title": "Повелитель тайн, глава 1280",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L21327",
      "chapter": 1280,
      "line": 21327,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-542-9048",
      "title": "Повелитель тайн, глава 542",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L9048",
      "chapter": 542,
      "line": 9048,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-554-9274",
      "title": "Повелитель тайн, глава 554",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L9274",
      "chapter": 554,
      "line": 9274,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-558-9345",
      "title": "Повелитель тайн, глава 558",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L9345",
      "chapter": 558,
      "line": 9345,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1292-21521",
      "title": "Повелитель тайн, глава 1292",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L21521",
      "chapter": 1292,
      "line": 21521,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1323-22056",
      "title": "Повелитель тайн, глава 1323",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L22056",
      "chapter": 1323,
      "line": 22056,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-214-3475",
      "title": "Повелитель тайн, глава 214",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L3475",
      "chapter": 214,
      "line": 3475,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-215-3486",
      "title": "Повелитель тайн, глава 215",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L3486",
      "chapter": 215,
      "line": 3486,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-268-4366",
      "title": "Повелитель тайн, глава 268",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L4366",
      "chapter": 268,
      "line": 4366,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-325-5318",
      "title": "Повелитель тайн, глава 325",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L5318",
      "chapter": 325,
      "line": 5318,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1315-21940",
      "title": "Повелитель тайн, глава 1315",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L21940",
      "chapter": 1315,
      "line": 21940,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1330-22171",
      "title": "Повелитель тайн, глава 1330",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L22171",
      "chapter": 1330,
      "line": 22171,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1328-22141",
      "title": "Повелитель тайн, глава 1328",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L22141",
      "chapter": 1328,
      "line": 22141,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-880-14611",
      "title": "Повелитель тайн, глава 880",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L14611",
      "chapter": 880,
      "line": 14611,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1431-0",
      "title": "Повелитель тайн, глава 1431",
      "url": "https://github.com/Demetri0/fb2-lord-of-the-mysteries/blob/4d98c272bcc16db66ce834451fd2e793bad1e337/Lord%20Of%20The%20Mysteries.fb2#L121214",
      "chapter": 1431,
      "line": 0,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-126-2013",
      "title": "Повелитель тайн, глава 126",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L2013",
      "chapter": 126,
      "line": 2013,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-126-2016",
      "title": "Повелитель тайн, глава 126",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L2016",
      "chapter": 126,
      "line": 2016,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-490-8148",
      "title": "Повелитель тайн, глава 490",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8148",
      "chapter": 490,
      "line": 8148,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-497-8262",
      "title": "Повелитель тайн, глава 497",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8262",
      "chapter": 497,
      "line": 8262,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-505-8385",
      "title": "Повелитель тайн, глава 505",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8385",
      "chapter": 505,
      "line": 8385,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-517-8625",
      "title": "Повелитель тайн, глава 517",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8625",
      "chapter": 517,
      "line": 8625,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-505-8398",
      "title": "Повелитель тайн, глава 505",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8398",
      "chapter": 505,
      "line": 8398,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-517-8630",
      "title": "Повелитель тайн, глава 517",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8630",
      "chapter": 517,
      "line": 8630,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-1334-22260",
      "title": "Повелитель тайн, глава 1334",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L22260",
      "chapter": 1334,
      "line": 22260,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-597-10021",
      "title": "Повелитель тайн, глава 597",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L10021",
      "chapter": 597,
      "line": 10021,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-600-10073",
      "title": "Повелитель тайн, глава 600",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L10073",
      "chapter": 600,
      "line": 10073,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-523-8718",
      "title": "Повелитель тайн, глава 523",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8718",
      "chapter": 523,
      "line": 8718,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-531-8858",
      "title": "Повелитель тайн, глава 531",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8858",
      "chapter": 531,
      "line": 8858,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-533-8898",
      "title": "Повелитель тайн, глава 533",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L8898",
      "chapter": 533,
      "line": 8898,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-574-9624",
      "title": "Повелитель тайн, глава 574",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L9624",
      "chapter": 574,
      "line": 9624,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-575-9630",
      "title": "Повелитель тайн, глава 575",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L9630",
      "chapter": 575,
      "line": 9630,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-602-10105",
      "title": "Повелитель тайн, глава 602",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L10105",
      "chapter": 602,
      "line": 10105,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-604-10139",
      "title": "Повелитель тайн, глава 604",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L10139",
      "chapter": 604,
      "line": 10139,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-611-10251",
      "title": "Повелитель тайн, глава 611",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L10251",
      "chapter": 611,
      "line": 10251,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-634-10626",
      "title": "Повелитель тайн, глава 634",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L10626",
      "chapter": 634,
      "line": 10626,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-634-10630",
      "title": "Повелитель тайн, глава 634",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L10630",
      "chapter": 634,
      "line": 10630,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-687-11555",
      "title": "Повелитель тайн, глава 687",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L11555",
      "chapter": 687,
      "line": 11555,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-687-11561",
      "title": "Повелитель тайн, глава 687",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L11561",
      "chapter": 687,
      "line": 11561,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-688-11575",
      "title": "Повелитель тайн, глава 688",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L11575",
      "chapter": 688,
      "line": 11575,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-903-14968",
      "title": "Повелитель тайн, глава 903",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L14968",
      "chapter": 903,
      "line": 14968,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-904-14984",
      "title": "Повелитель тайн, глава 904",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L14984",
      "chapter": 904,
      "line": 14984,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-905-14988",
      "title": "Повелитель тайн, глава 905",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L14988",
      "chapter": 905,
      "line": 14988,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-906-15015",
      "title": "Повелитель тайн, глава 906",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L15015",
      "chapter": 906,
      "line": 15015,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-906-15020",
      "title": "Повелитель тайн, глава 906",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L15020",
      "chapter": 906,
      "line": 15020,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-592-9928",
      "title": "Повелитель тайн, глава 592",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L9928",
      "chapter": 592,
      "line": 9928,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-592-9929",
      "title": "Повелитель тайн, глава 592",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L9929",
      "chapter": 592,
      "line": 9929,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-674-11337",
      "title": "Повелитель тайн, глава 674",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L11337",
      "chapter": 674,
      "line": 11337,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-703-11809",
      "title": "Повелитель тайн, глава 703",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L11809",
      "chapter": 703,
      "line": 11809,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    },
    {
      "id": "book-893-14812",
      "title": "Повелитель тайн, глава 893",
      "url": "https://github.com/Madhukar-Palakaveeti/Chat-With-LOTM/blob/b0caf9e4ebfd1781132840d12fe51751bf6df29a/resources/paragraphs.txt#L14812",
      "chapter": 893,
      "line": 14812,
      "sourceType": "Публичное зеркало текста; не официальный издательский ресурс."
    }
  ],
  "stations": [
    {
      "id": "backlund",
      "name": "Бэклунд",
      "x": 54.45945945945946,
      "y": 29.131578947368418,
      "note": "Городская привязка к символу на фанатской карте; точное положение железнодорожной станции не установлено."
    },
    {
      "id": "belltaine",
      "name": "Беллтайн",
      "x": 51.63513513513514,
      "y": 27.368421052631582,
      "note": "Городская привязка к символу на фанатской карте; точное положение станции не установлено."
    },
    {
      "id": "conant",
      "name": "Конант",
      "x": 50.93243243243243,
      "y": 33.39473684210526,
      "note": "Городская привязка к символу на фанатской карте; точное положение железнодорожной станции не установлено."
    },
    {
      "id": "constant",
      "name": "Констант",
      "x": 51.17567567567568,
      "y": 26.526315789473685,
      "note": "Городская привязка к символу на фанатской карте; точное положение железнодорожной станции не установлено."
    },
    {
      "id": "enmat",
      "name": "Порт Энмат",
      "x": 55.58108108108109,
      "y": 26.894736842105267,
      "note": "Городская привязка к символу на фанатской карте; точное положение железнодорожной станции не установлено."
    },
    {
      "id": "pritz",
      "name": "Порт Приц",
      "x": 54.7972972972973,
      "y": 29.789473684210527,
      "note": "Городская привязка к символу на фанатской карте; точное положение железнодорожной станции не установлено."
    },
    {
      "id": "tingen",
      "name": "Тинген",
      "x": 53.9054054054054,
      "y": 26.526315789473685,
      "note": "Городская привязка к символу на фанатской карте; точное положение железнодорожной станции не установлено."
    }
  ],
  "railServices": [
    {
      "id": "rail-tingen-backlund",
      "name": "Тинген — Бэклунд",
      "from": "tingen",
      "to": "backlund",
      "points": [
        [
          53.9054054054054,
          26.526315789473685
        ],
        [
          53.75675675675675,
          27.105263157894736
        ],
        [
          53.93243243243243,
          27.89473684210526
        ],
        [
          54.16216216216216,
          28.52631578947368
        ],
        [
          54.45945945945946,
          29.131578947368418
        ]
      ],
      "speedKmh": 40,
      "dockMinutes": 5,
      "serviceKind": "rail-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-213-3456",
          "book-126-2020"
        ],
        "claim": "Пассажирский поезд из Тингена в Бэклунд; в тексте указано около четырёх часов в пути. Wienia названа первой остановкой поезда Тинген—Бэклунд.",
        "note": "Wienia — первая остановка. Геометрия пути и точные координаты промежуточного города не опубликованы.",
        "geometry": "schematic",
        "canonicalDuration": "около 4 часов; первая остановка — Виения (Wienia), её координаты не установлены",
        "simulationNote": "Игровой поезд и обратный рейс моделируются по сетке 1500 км² на клетку при 40 км/ч и 5-минутной стоянке. Это не расписание из романа."
      }
    },
    {
      "id": "rail-tingen-enmat",
      "name": "Тинген — порт Энмат",
      "from": "tingen",
      "to": "enmat",
      "points": [
        [
          53.9054054054054,
          26.526315789473685
        ],
        [
          54.09459459459459,
          26.81578947368421
        ],
        [
          54.45945945945946,
          26.94736842105263
        ],
        [
          55.00000000000001,
          27.105263157894736
        ],
        [
          55.36486486486486,
          27.052631578947366
        ],
        [
          55.58108108108109,
          26.894736842105267
        ]
      ],
      "speedKmh": 40,
      "dockMinutes": 5,
      "serviceKind": "rail-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-12-226",
          "book-56-892"
        ],
        "claim": "Клейн рассматривает выезд из Тингена поездом на восток в порт Энмат. Джойс возвращается из порта Энмат домой в Тинген на паровозе.",
        "note": "В главе 56 Джойс возвращается поездом из Энмата в Тинген; это не только гипотетический план.",
        "geometry": "schematic",
        "simulationNote": "Игровой поезд и обратный рейс моделируются по сетке 1500 км² на клетку при 40 км/ч и 5-минутной стоянке. Это не расписание из романа."
      }
    },
    {
      "id": "rail-soaring-express",
      "name": "Soaring Express — линия до Константа",
      "from": "tingen",
      "to": "constant",
      "points": [
        [
          53.9054054054054,
          26.526315789473685
        ],
        [
          53.51351351351351,
          26.31578947368421
        ],
        [
          53.04054054054054,
          26.157894736842106
        ],
        [
          52.54054054054053,
          26.105263157894736
        ],
        [
          52.02702702702703,
          26.31578947368421
        ],
        [
          51.554054054054056,
          26.526315789473685
        ],
        [
          51.17567567567568,
          26.526315789473685
        ]
      ],
      "speedKmh": 40,
      "dockMinutes": 5,
      "serviceKind": "rail-service",
      "evidence": {
        "status": "contextual",
        "sourceIds": [
          "book-17-304"
        ],
        "claim": "Назван паровой экспресс Soaring Express, начинающий прямое сообщение с Константом.",
        "note": "Отправление именно из Тингена выводится из контекста местной газеты; исходная цитата называет только конечный Констант. Поэтому полная связь Тинген—Констант отмечается как реконструкция.",
        "geometry": "schematic",
        "simulationNote": "Игровой поезд и обратный рейс моделируются по сетке 1500 км² на клетку при 40 км/ч и 5-минутной стоянке. Это не расписание из романа."
      }
    },
    {
      "id": "rail-backlund-pritz",
      "name": "Бэклунд — порт Приц",
      "from": "backlund",
      "to": "pritz",
      "points": [
        [
          54.45945945945946,
          29.131578947368418
        ],
        [
          54.52702702702703,
          29.342105263157897
        ],
        [
          54.63513513513514,
          29.526315789473685
        ],
        [
          54.7972972972973,
          29.789473684210527
        ]
      ],
      "speedKmh": 40,
      "dockMinutes": 5,
      "serviceKind": "rail-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-406-6710"
        ],
        "claim": "Форс планирует поездку поездом из Бэклунда в Приц; названо время примерно около часа.",
        "note": "В главе 407 Форс действительно прибывает в порт поездом.",
        "geometry": "schematic",
        "canonicalDuration": "около 1 часа",
        "simulationNote": "Игровой поезд и обратный рейс моделируются по сетке 1500 км² на клетку при 40 км/ч и 5-минутной стоянке. Это не расписание из романа."
      }
    },
    {
      "id": "rail-pritz-conant",
      "name": "Порт Приц — Конант",
      "from": "pritz",
      "to": "conant",
      "points": [
        [
          54.7972972972973,
          29.789473684210527
        ],
        [
          54.63513513513514,
          29.526315789473685
        ],
        [
          54.52702702702703,
          29.342105263157897
        ],
        [
          54.18918918918919,
          30.0
        ],
        [
          53.71621621621622,
          30.92105263157895
        ],
        [
          53.04054054054054,
          31.57894736842105
        ],
        [
          52.22972972972973,
          32.23684210526316
        ],
        [
          51.554054054054056,
          32.89473684210527
        ],
        [
          50.93243243243243,
          33.39473684210526
        ]
      ],
      "speedKmh": 40,
      "dockMinutes": 5,
      "serviceKind": "rail-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-731-12265"
        ],
        "claim": "Клейн садится на поезд возле порта Приц и направляется в Конант в заливе Дези.",
        "note": "",
        "geometry": "schematic",
        "simulationNote": "Игровой поезд и обратный рейс моделируются по сетке 1500 км² на клетку при 40 км/ч и 5-минутной стоянке. Это не расписание из романа."
      }
    },
    {
      "id": "rail-conant-backlund",
      "name": "Конант — Бэклунд",
      "from": "conant",
      "to": "backlund",
      "points": [
        [
          50.93243243243243,
          33.39473684210526
        ],
        [
          51.37837837837837,
          32.8421052631579
        ],
        [
          52.09459459459459,
          32.36842105263158
        ],
        [
          52.702702702702695,
          31.63157894736842
        ],
        [
          53.24324324324324,
          30.789473684210527
        ],
        [
          53.918918918918926,
          29.736842105263158
        ],
        [
          54.45945945945946,
          29.131578947368418
        ]
      ],
      "speedKmh": 40,
      "dockMinutes": 5,
      "serviceKind": "rail-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-732-12279",
          "book-975-16147",
          "book-1333-22234"
        ],
        "claim": "После прибытия в Конант в предыдущей главе Клейн покупает билет в Бэклунд и приезжает туда поездом. Подтверждён поезд из залива Дези до Бэклунда. Подтверждены железные дороги из залива Дези, ведущие в Бэклунд; станции Утопия на них официально нет.",
        "note": "Глава 975 и главы 1333–1334 дополнительно подтверждают железнодорожное сообщение залива Дези с Бэклундом.",
        "geometry": "schematic",
        "simulationNote": "Игровой поезд и обратный рейс моделируются по сетке 1500 км² на клетку при 40 км/ч и 5-минутной стоянке. Это не расписание из романа."
      }
    },
    {
      "id": "rail-belltaine-constant",
      "name": "Беллтайн — Констант",
      "from": "belltaine",
      "to": "constant",
      "points": [
        [
          51.63513513513514,
          27.368421052631582
        ],
        [
          51.59459459459459,
          26.973684210526315
        ],
        [
          51.45945945945945,
          26.789473684210524
        ],
        [
          51.32432432432432,
          26.57894736842105
        ],
        [
          51.17567567567568,
          26.526315789473685
        ]
      ],
      "speedKmh": 40,
      "dockMinutes": 5,
      "serviceKind": "rail-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-1280-21327"
        ],
        "claim": "Клейн едет в поезде, направляющемся в Констант, и выходит на промежуточной станции Беллтайна.",
        "note": "Документирована принадлежность Беллтайна маршруту до Константа. Исходная станция поезда в этой сцене не названа.",
        "geometry": "schematic",
        "simulationNote": "Игровой поезд и обратный рейс моделируются по сетке 1500 км² на клетку при 40 км/ч и 5-минутной стоянке. Это не расписание из романа."
      }
    }
  ],
  "extraPorts": [
    {
      "id": "enmat",
      "name": "Порт Энмат",
      "island": "Королевство Лоэн",
      "kind": "harbor",
      "x": 55.97297297297297,
      "y": 27.368421052631582,
      "note": "Условная морская привязка у гавани к востоку от городского символа. Точное положение причалов текстом/картой не задано."
    },
    {
      "id": "kolain",
      "name": "Колайн",
      "island": "Восточный Балам",
      "kind": "harbor",
      "x": 59.027027027027025,
      "y": 47.368421052631575,
      "note": "Колайн на северном побережье East Balam, не Behrens Harbor в West Balam. Причальная привязка выбрана в воде прямо к северу от городского символа; точная гавань не нанесена."
    }
  ],
  "seaServices": [
    {
      "id": "source-white-agate-main",
      "name": "Белый агат: обычный рейс Приц — Байам",
      "speedKnots": 13,
      "dockMinutes": 60,
      "stopIds": [
        "pritz",
        "damir",
        "tiana",
        "bayam"
      ],
      "legs": [
        {
          "from": "pritz",
          "to": "damir",
          "points": [
            [
              54.972972972972975,
              30.473684210526315
            ],
            [
              55.270270270270274,
              31.31578947368421
            ],
            [
              55.54054054054054,
              32.631578947368425
            ],
            [
              55.472972972972975,
              33.421052631578945
            ],
            [
              55.067567567567565,
              33.68421052631579
            ]
          ]
        },
        {
          "from": "damir",
          "to": "tiana",
          "points": [
            [
              55.067567567567565,
              33.68421052631579
            ],
            [
              55.270270270270274,
              34.0
            ],
            [
              55.54054054054054,
              34.473684210526315
            ],
            [
              55.81081081081081,
              35.13157894736842
            ],
            [
              55.648648648648646,
              35.6578947368421
            ],
            [
              55.97297297297297,
              35.78947368421053
            ],
            [
              56.28378378378378,
              36.31578947368421
            ],
            [
              56.08108108108109,
              36.84210526315789
            ],
            [
              55.67567567567567,
              37.10526315789473
            ]
          ]
        },
        {
          "from": "tiana",
          "to": "bayam",
          "points": [
            [
              55.67567567567567,
              37.10526315789473
            ],
            [
              55.945945945945944,
              36.84210526315789
            ],
            [
              56.351351351351354,
              36.71052631578947
            ],
            [
              56.75675675675676,
              37.76315789473684
            ],
            [
              57.432432432432435,
              38.421052631578945
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.97297297297297,
              39.21052631578947
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.351351351351354,
              39.421052631578945
            ]
          ]
        },
        {
          "from": "bayam",
          "to": "pritz",
          "points": [
            [
              58.351351351351354,
              39.421052631578945
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              57.90540540540541,
              39.21052631578947
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.567567567567565,
              37.76315789473684
            ],
            [
              56.89189189189189,
              36.05263157894737
            ],
            [
              56.41891891891891,
              34.21052631578947
            ],
            [
              55.81081081081081,
              32.631578947368425
            ],
            [
              55.270270270270274,
              31.18421052631579
            ],
            [
              54.972972972972975,
              30.473684210526315
            ]
          ]
        }
      ],
      "serviceKind": "regular-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-490-8148",
          "book-497-8262",
          "book-505-8385",
          "book-517-8625"
        ],
        "claim": "В порту Приц предлагаются пассажирские билеты на White Agate и Saint Havre в Рорстедский архипелаг. White Agate заходит в Дамир для пополнения продовольствия и воды, с выходом на следующее утро. После Дамира обычный план White Agate предусматривает Тиану, затем Байам; от Дамира до Тианы указаны три дня при 13 узлах. Фактическое путешествие прошло через Тиану и завершилось в Байаме; помощь ветра дала устойчивые 15 узлов.",
        "note": "Подтверждённая обычная последовательность. Возвратные порты по порядку автоматически не подтверждены. Длительности из книги могут расходиться с ETA по пользовательской сетке 1500 км².",
        "geometry": "schematic",
        "canonicalDuration": "Дамир — Тиана: 3 суток при 13 узлах",
        "vessel": "White Agate / Белый агат",
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-white-agate-bansy-detour",
      "name": "Белый агат: описанный заход в Банси",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "pritz",
        "damir",
        "bansy",
        "tiana",
        "bayam"
      ],
      "legs": [
        {
          "from": "pritz",
          "to": "damir",
          "points": [
            [
              54.972972972972975,
              30.473684210526315
            ],
            [
              55.270270270270274,
              31.31578947368421
            ],
            [
              55.54054054054054,
              32.631578947368425
            ],
            [
              55.472972972972975,
              33.421052631578945
            ],
            [
              55.067567567567565,
              33.68421052631579
            ]
          ]
        },
        {
          "from": "damir",
          "to": "bansy",
          "points": [
            [
              55.067567567567565,
              33.68421052631579
            ],
            [
              55.270270270270274,
              34.0
            ],
            [
              55.54054054054054,
              34.473684210526315
            ],
            [
              55.81081081081081,
              35.13157894736842
            ],
            [
              55.648648648648646,
              35.6578947368421
            ]
          ]
        },
        {
          "from": "bansy",
          "to": "tiana",
          "points": [
            [
              55.648648648648646,
              35.6578947368421
            ],
            [
              55.97297297297297,
              35.78947368421053
            ],
            [
              56.28378378378378,
              36.31578947368421
            ],
            [
              56.08108108108109,
              36.84210526315789
            ],
            [
              55.67567567567567,
              37.10526315789473
            ]
          ]
        },
        {
          "from": "tiana",
          "to": "bayam",
          "points": [
            [
              55.67567567567567,
              37.10526315789473
            ],
            [
              55.945945945945944,
              36.84210526315789
            ],
            [
              56.351351351351354,
              36.71052631578947
            ],
            [
              56.75675675675676,
              37.76315789473684
            ],
            [
              57.432432432432435,
              38.421052631578945
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.97297297297297,
              39.21052631578947
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.351351351351354,
              39.421052631578945
            ]
          ]
        },
        {
          "from": "bayam",
          "to": "pritz",
          "points": [
            [
              58.351351351351354,
              39.421052631578945
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              57.90540540540541,
              39.21052631578947
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.567567567567565,
              37.76315789473684
            ],
            [
              56.89189189189189,
              36.05263157894737
            ],
            [
              56.41891891891891,
              34.21052631578947
            ],
            [
              55.81081081081081,
              32.631578947368425
            ],
            [
              55.270270270270274,
              31.18421052631579
            ],
            [
              54.972972972972975,
              30.473684210526315
            ]
          ]
        }
      ],
      "serviceKind": "documented-voyage",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-505-8385",
          "book-505-8398",
          "book-517-8625",
          "book-517-8630"
        ],
        "claim": "Капитан решает остановиться в Банси после встречи с пиратами; это изменение обычного плана Дамир — Тиана. В этот день судно входит в Банси в 18:00. После Банси судно заходит в Тиану и приходит в Байам вечером 12-го вместо запланированного утра 13-го. Время фактического прибытия White Agate в Байам — 18:15.",
        "note": "Это конкретный исторический рейс, а не доказательство обязательного захода каждого рейса в Банси.",
        "geometry": "schematic",
        "storyPeriod": "До последующего разрушения/закрытия Банси",
        "vessel": "White Agate / Белый агат",
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-pritz-bansy-bayam-fast",
      "name": "Короткий морской путь Приц — Банси — Байам",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "pritz",
        "bansy",
        "bayam"
      ],
      "legs": [
        {
          "from": "pritz",
          "to": "bansy",
          "points": [
            [
              54.972972972972975,
              30.473684210526315
            ],
            [
              55.270270270270274,
              31.31578947368421
            ],
            [
              55.54054054054054,
              32.631578947368425
            ],
            [
              55.472972972972975,
              33.421052631578945
            ],
            [
              55.067567567567565,
              33.68421052631579
            ],
            [
              55.270270270270274,
              34.0
            ],
            [
              55.54054054054054,
              34.473684210526315
            ],
            [
              55.81081081081081,
              35.13157894736842
            ],
            [
              55.648648648648646,
              35.6578947368421
            ]
          ]
        },
        {
          "from": "bansy",
          "to": "bayam",
          "points": [
            [
              55.648648648648646,
              35.6578947368421
            ],
            [
              55.97297297297297,
              35.78947368421053
            ],
            [
              56.28378378378378,
              36.31578947368421
            ],
            [
              56.08108108108109,
              36.84210526315789
            ],
            [
              55.67567567567567,
              37.10526315789473
            ],
            [
              55.945945945945944,
              36.84210526315789
            ],
            [
              56.351351351351354,
              36.71052631578947
            ],
            [
              56.75675675675676,
              37.76315789473684
            ],
            [
              57.432432432432435,
              38.421052631578945
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.97297297297297,
              39.21052631578947
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.351351351351354,
              39.421052631578945
            ]
          ]
        },
        {
          "from": "bayam",
          "to": "pritz",
          "points": [
            [
              58.351351351351354,
              39.421052631578945
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              57.90540540540541,
              39.21052631578947
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.567567567567565,
              37.76315789473684
            ],
            [
              56.89189189189189,
              36.05263157894737
            ],
            [
              56.41891891891891,
              34.21052631578947
            ],
            [
              55.81081081081081,
              32.631578947368425
            ],
            [
              55.270270270270274,
              31.18421052631579
            ],
            [
              54.972972972972975,
              30.473684210526315
            ]
          ]
        }
      ],
      "serviceKind": "regular-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-505-8385",
          "book-1334-22260"
        ],
        "claim": "Прямо упомянут более быстрый путь Приц — Байам с единственной промежуточной остановкой в Банси; Банси примерно в 120 морских милях от Дамира. Позднее Банси не восстановлен и регулярные лайнеры туда не ходят.",
        "note": "Название судна и регулярное расписание не даны. Доступность зависит от периода истории.",
        "geometry": "schematic",
        "storyPeriod": "До закрытия Банси",
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-white-agate-return",
      "name": "Белый агат: обратный рейс Байам — Приц",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "bayam",
        "pritz"
      ],
      "legs": [
        {
          "from": "bayam",
          "to": "pritz",
          "points": [
            [
              58.351351351351354,
              39.421052631578945
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              57.90540540540541,
              39.21052631578947
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.567567567567565,
              37.76315789473684
            ],
            [
              56.89189189189189,
              36.05263157894737
            ],
            [
              56.41891891891891,
              34.21052631578947
            ],
            [
              55.81081081081081,
              32.631578947368425
            ],
            [
              55.270270270270274,
              31.18421052631579
            ],
            [
              54.972972972972975,
              30.473684210526315
            ]
          ]
        },
        {
          "from": "pritz",
          "to": "bayam",
          "points": [
            [
              54.972972972972975,
              30.473684210526315
            ],
            [
              55.270270270270274,
              31.18421052631579
            ],
            [
              55.81081081081081,
              32.631578947368425
            ],
            [
              56.41891891891891,
              34.21052631578947
            ],
            [
              56.89189189189189,
              36.05263157894737
            ],
            [
              57.567567567567565,
              37.76315789473684
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.90540540540541,
              39.21052631578947
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.351351351351354,
              39.421052631578945
            ]
          ]
        }
      ],
      "serviceKind": "regular-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-597-10021",
          "book-600-10073"
        ],
        "claim": "Упомянуто, что White Agate скоро возвращается в порт Приц. Последующая сцена помещена на White Agate в гавани Байама.",
        "note": "Подтверждены направление и порты. Обратный порядок всех промежуточных остановок в источнике здесь не задан.",
        "geometry": "schematic",
        "vessel": "White Agate / Белый агат",
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-bayam-symeem-liner",
      "name": "Лайнер Байам — Симиим",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "bayam",
        "symeem"
      ],
      "legs": [
        {
          "from": "bayam",
          "to": "symeem",
          "points": [
            [
              58.351351351351354,
              39.421052631578945
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.04054054054054,
              39.55263157894737
            ],
            [
              57.90540540540541,
              39.473684210526315
            ],
            [
              57.78378378378378,
              39.631578947368425
            ],
            [
              57.770270270270274,
              40.39473684210526
            ],
            [
              58.24324324324325,
              40.78947368421053
            ],
            [
              59.189189189189186,
              40.78947368421053
            ],
            [
              60.06756756756757,
              40.60526315789474
            ],
            [
              60.47297297297297,
              40.131578947368425
            ]
          ]
        },
        {
          "from": "symeem",
          "to": "bayam",
          "points": [
            [
              60.47297297297297,
              40.131578947368425
            ],
            [
              60.06756756756757,
              40.60526315789474
            ],
            [
              59.189189189189186,
              40.78947368421053
            ],
            [
              58.24324324324325,
              40.78947368421053
            ],
            [
              57.770270270270274,
              40.39473684210526
            ],
            [
              57.78378378378378,
              39.631578947368425
            ],
            [
              57.90540540540541,
              39.473684210526315
            ],
            [
              58.04054054054054,
              39.55263157894737
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.351351351351354,
              39.421052631578945
            ]
          ]
        }
      ],
      "serviceKind": "regular-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-523-8718",
          "book-531-8858",
          "book-533-8898"
        ],
        "claim": "От Байама до Симиима лайнер идёт четыре-пять часов; указаны два ежедневных рейса в 09:00 и 10:00. Поездка на Симиим занимает почти пять часов. Обратный билет Клейна с Симиима куплен на лайнер в 09:00; также имеется более поздний лайнер в 10:00.",
        "note": "Симиим имеет подтверждённое пассажирское сообщение: его нельзя характеризовать только как необслуживаемый экспедиционный рейд. Календарь кампании может менять доступность.",
        "geometry": "schematic",
        "canonicalDuration": "4–5 игровых часов по тексту книги",
        "departureTimes": [
          "09:00",
          "10:00"
        ],
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-bayam-dilynius-gargas",
      "name": "Путешествие Байам — Дилимиус — Гаргас",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "bayam",
        "dilymius"
      ],
      "legs": [
        {
          "from": "bayam",
          "to": "dilymius",
          "points": [
            [
              58.351351351351354,
              39.421052631578945
            ],
            [
              58.108108108108105,
              40.131578947368425
            ],
            [
              57.7027027027027,
              40.578947368421055
            ],
            [
              57.351351351351354,
              40.78947368421053
            ]
          ]
        },
        {
          "from": "dilymius",
          "to": "bayam",
          "points": [
            [
              57.351351351351354,
              40.78947368421053
            ],
            [
              57.7027027027027,
              40.578947368421055
            ],
            [
              58.108108108108105,
              40.131578947368425
            ],
            [
              58.351351351351354,
              39.421052631578945
            ]
          ]
        }
      ],
      "serviceKind": "documented-voyage",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-574-9624",
          "book-575-9630"
        ],
        "claim": "Клейн и Даниц садятся на лайнер к гавани Дилимиуса; ожидаемое время — десять часов. Безопасный путь из Байама в Дилимиус извилист; после прибытия покупаются новые билеты и следующая поездка заканчивается в Гаргасе на рассвете.",
        "note": "В Дилимиусе происходит пересадка/покупка новых билетов. Название конечного порта Гаргаса здесь не уточнено: Нас можно использовать лишь как отмеченную реконструкцию.",
        "geometry": "schematic",
        "canonicalDuration": "Байам — Дилимиус: около 10 часов",
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-bayam-oravi-liner",
      "name": "Лайнер Байам — Орави",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "bayam",
        "oravi"
      ],
      "legs": [
        {
          "from": "bayam",
          "to": "oravi",
          "points": [
            [
              58.351351351351354,
              39.421052631578945
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              57.97297297297297,
              39.21052631578947
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.770270270270274,
              37.368421052631575
            ],
            [
              57.97297297297297,
              36.05263157894737
            ],
            [
              58.78378378378378,
              35.0
            ],
            [
              59.32432432432433,
              34.73684210526316
            ],
            [
              59.66216216216216,
              34.73684210526316
            ],
            [
              60.13513513513513,
              34.868421052631575
            ],
            [
              60.67567567567568,
              35.0
            ],
            [
              60.945945945945944,
              35.21052631578947
            ]
          ]
        },
        {
          "from": "oravi",
          "to": "bayam",
          "points": [
            [
              60.945945945945944,
              35.21052631578947
            ],
            [
              60.67567567567568,
              35.0
            ],
            [
              60.13513513513513,
              34.868421052631575
            ],
            [
              59.66216216216216,
              34.73684210526316
            ],
            [
              59.32432432432433,
              34.73684210526316
            ],
            [
              58.78378378378378,
              35.0
            ],
            [
              57.97297297297297,
              36.05263157894737
            ],
            [
              57.770270270270274,
              37.368421052631575
            ],
            [
              58.04054054054054,
              38.631578947368425
            ],
            [
              57.97297297297297,
              39.21052631578947
            ],
            [
              58.108108108108105,
              39.60526315789474
            ],
            [
              58.24324324324325,
              39.68421052631579
            ],
            [
              58.351351351351354,
              39.421052631578945
            ]
          ]
        }
      ],
      "serviceKind": "regular-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-602-10105",
          "book-604-10139",
          "book-611-10251"
        ],
        "claim": "Дарквилл планирует ранний рейс на Орави; остров назван остановкой на пути между Рорстедом и Тоскартером. Клейн и Дарквилл направляются в гавань Байама, чтобы успеть на самый ранний лайнер к Орави. Орави находится северо-восточнее Рорстеда; безопасный морской путь извилист и длиннее прямого на несколько сотен морских миль.",
        "note": "Связь портов подтверждена, точная трасса и регулярные часы отправления не даны. Геометрию на карте следует помечать как реконструкцию.",
        "geometry": "schematic",
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-oravi-nas-liner",
      "name": "Лайнер Орави — Нас",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "oravi",
        "nas"
      ],
      "legs": [
        {
          "from": "oravi",
          "to": "nas",
          "points": [
            [
              60.945945945945944,
              35.21052631578947
            ],
            [
              61.05405405405405,
              34.526315789473685
            ],
            [
              61.28378378378378,
              33.73684210526316
            ],
            [
              61.55405405405405,
              32.76315789473684
            ],
            [
              61.85135135135135,
              31.789473684210527
            ],
            [
              62.08108108108108,
              30.973684210526315
            ]
          ]
        },
        {
          "from": "nas",
          "to": "oravi",
          "points": [
            [
              62.08108108108108,
              30.973684210526315
            ],
            [
              61.85135135135135,
              31.789473684210527
            ],
            [
              61.55405405405405,
              32.76315789473684
            ],
            [
              61.28378378378378,
              33.73684210526316
            ],
            [
              61.05405405405405,
              34.526315789473685
            ],
            [
              60.945945945945944,
              35.21052631578947
            ]
          ]
        }
      ],
      "serviceKind": "regular-service",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-634-10626",
          "book-634-10630"
        ],
        "claim": "После работы на Орави Клейн садится на судно в Гаргас, чтобы встретиться с Каттлеей в его столице — Насе. Клейн сходит с лайнера в гавани Гаргаса перед встречей с пиратами.",
        "note": "Маршрут подтверждён. Продолжение на Future — отдельная экспедиция, не обычный пароходный рейс.",
        "geometry": "schematic",
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-toscarter-oravi-liner",
      "name": "Лайнер Тоскартер — Орави",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "toscarter",
        "oravi"
      ],
      "legs": [
        {
          "from": "toscarter",
          "to": "oravi",
          "points": [
            [
              63.64864864864865,
              35.89473684210526
            ],
            [
              63.24324324324324,
              35.0
            ],
            [
              62.43243243243243,
              34.21052631578947
            ],
            [
              61.62162162162163,
              34.21052631578947
            ],
            [
              60.945945945945944,
              35.21052631578947
            ]
          ]
        },
        {
          "from": "oravi",
          "to": "toscarter",
          "points": [
            [
              60.945945945945944,
              35.21052631578947
            ],
            [
              61.62162162162163,
              34.21052631578947
            ],
            [
              62.43243243243243,
              34.21052631578947
            ],
            [
              63.24324324324324,
              35.0
            ],
            [
              63.64864864864865,
              35.89473684210526
            ]
          ]
        }
      ],
      "serviceKind": "documented-voyage",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-687-11555",
          "book-687-11561",
          "book-688-11575"
        ],
        "claim": "Перед отплытием Клейн находится у пристани Тоскартера. Клейн и Андерсон садятся на пассажирское судно. После двухдневного путешествия лайнер приходит на Орави.",
        "note": "Подтверждена конкретная поездка пассажирским лайнером; название и полный периодический график не указаны.",
        "geometry": "schematic",
        "canonicalDuration": "2 суток",
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-esk-el-balam-voyage",
      "name": "Лайнер Эскелсон — Халман — Вэйпойнт — Колайн",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "eskelson",
        "halman",
        "waypoint",
        "kolain"
      ],
      "legs": [
        {
          "from": "eskelson",
          "to": "halman",
          "points": [
            [
              50.445945945945944,
              36.973684210526315
            ],
            [
              50.810810810810814,
              36.578947368421055
            ],
            [
              51.21621621621622,
              37.10526315789473
            ],
            [
              51.486486486486484,
              37.84210526315789
            ]
          ]
        },
        {
          "from": "halman",
          "to": "waypoint",
          "points": [
            [
              51.486486486486484,
              37.84210526315789
            ],
            [
              51.689189189189186,
              36.973684210526315
            ],
            [
              52.16216216216216,
              36.973684210526315
            ],
            [
              52.702702702702695,
              37.89473684210527
            ],
            [
              52.702702702702695,
              39.473684210526315
            ],
            [
              52.94594594594595,
              40.473684210526315
            ]
          ]
        },
        {
          "from": "waypoint",
          "to": "kolain",
          "points": [
            [
              52.94594594594595,
              40.473684210526315
            ],
            [
              52.83783783783784,
              41.05263157894737
            ],
            [
              52.94594594594595,
              41.78947368421053
            ],
            [
              53.37837837837838,
              42.368421052631575
            ],
            [
              54.054054054054056,
              43.94736842105263
            ],
            [
              55.00000000000001,
              45.0
            ],
            [
              56.08108108108109,
              45.78947368421053
            ],
            [
              57.16216216216217,
              46.05263157894737
            ],
            [
              58.108108108108105,
              46.578947368421055
            ],
            [
              58.648648648648646,
              47.10526315789474
            ],
            [
              59.027027027027025,
              47.368421052631575
            ]
          ]
        },
        {
          "from": "kolain",
          "to": "eskelson",
          "points": [
            [
              59.027027027027025,
              47.368421052631575
            ],
            [
              58.648648648648646,
              47.10526315789474
            ],
            [
              58.108108108108105,
              46.578947368421055
            ],
            [
              57.16216216216217,
              46.05263157894737
            ],
            [
              56.08108108108109,
              45.78947368421053
            ],
            [
              55.00000000000001,
              45.0
            ],
            [
              54.054054054054056,
              43.94736842105263
            ],
            [
              53.37837837837838,
              42.368421052631575
            ],
            [
              52.94594594594595,
              41.78947368421053
            ],
            [
              52.83783783783784,
              41.05263157894737
            ],
            [
              52.94594594594595,
              40.473684210526315
            ],
            [
              52.702702702702695,
              39.473684210526315
            ],
            [
              52.702702702702695,
              37.89473684210527
            ],
            [
              52.16216216216216,
              36.973684210526315
            ],
            [
              51.689189189189186,
              36.973684210526315
            ],
            [
              51.486486486486484,
              37.84210526315789
            ],
            [
              51.21621621621622,
              37.10526315789473
            ],
            [
              50.810810810810814,
              36.578947368421055
            ],
            [
              50.445945945945944,
              36.973684210526315
            ]
          ]
        }
      ],
      "serviceKind": "documented-voyage",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-903-14968",
          "book-904-14984",
          "book-905-14988",
          "book-906-15015",
          "book-906-15020"
        ],
        "claim": "Сцена начинается в гавани Эскелсон в заливе Дези; Клейн приобретает билет на гибридный пароходно-парусный лайнер в Восточный Балам. Из-за погоды выбран более длинный безопасный путь и ночная стоянка в гавани Халман. Утром судно выходит из Халмана. Следующая сцена лайнера — стоянка на острове Вэйпойнт. Клейн сходит на причал Колайна в Восточном Баламе.",
        "note": "Халман и Вэйпойнт подтверждены для этой поездки при погодном обходе. Это не то же направление, что Беренс в Западном Баламе.",
        "geometry": "schematic",
        "vessel": "Безымянный пароходно-парусный лайнер",
        "simulationNote": "Нарисован безопасный водный коридор между указанными стоянками. Повторение и обратное замыкание — игровая анимация; неуказанные в книге промежуточные остановки и периодичность не утверждаются."
      }
    },
    {
      "id": "source-enmat-pritz-plan",
      "name": "Морской путь Энмат — Приц",
      "speedKnots": 12,
      "dockMinutes": 60,
      "stopIds": [
        "enmat",
        "pritz"
      ],
      "legs": [
        {
          "from": "enmat",
          "to": "pritz",
          "points": [
            [
              55.97297297297297,
              27.368421052631582
            ],
            [
              56.28378378378378,
              27.76315789473684
            ],
            [
              56.41891891891891,
              28.421052631578945
            ],
            [
              56.351351351351354,
              29.47368421052631
            ],
            [
              56.08108108108109,
              30.210526315789473
            ],
            [
              55.67567567567567,
              30.526315789473685
            ],
            [
              55.270270270270274,
              30.710526315789473
            ],
            [
              55.067567567567565,
              30.605263157894736
            ],
            [
              54.972972972972975,
              30.473684210526315
            ]
          ]
        },
        {
          "from": "pritz",
          "to": "enmat",
          "points": [
            [
              54.972972972972975,
              30.473684210526315
            ],
            [
              55.067567567567565,
              30.605263157894736
            ],
            [
              55.270270270270274,
              30.710526315789473
            ],
            [
              55.67567567567567,
              30.526315789473685
            ],
            [
              56.08108108108109,
              30.210526315789473
            ],
            [
              56.351351351351354,
              29.47368421052631
            ],
            [
              56.41891891891891,
              28.421052631578945
            ],
            [
              56.28378378378378,
              27.76315789473684
            ],
            [
              55.97297297297297,
              27.368421052631582
            ]
          ]
        }
      ],
      "serviceKind": "travel-plan",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-12-226"
        ],
        "claim": "План Клейна предусматривает поезд до Энмата, затем морской переход в Приц и дальнейший путь в Бэклунд.",
        "note": "В главе описан план поездки, а не совершённый рейс. Промежуточные стоянки не названы.",
        "geometry": "schematic",
        "simulationNote": "Анимация направления и обратного пути реконструирована для игры."
      }
    }
  ],
  "unmapped": [
    {
      "id": "rail-backlund-east-chester",
      "name": "Бэклунд — Восточный Честер",
      "kind": "train",
      "classificationLabel": "Подтверждено направление в графство; точная станция не названа",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-513-8563"
        ],
        "claim": "Одри собирается вернуться поездом из Бэклунда в графство Восточный Честер.",
        "note": "Точное название конечной станции не приведено; точка на карте должна быть региональным условным терминалом.",
        "geometry": "schematic"
      }
    },
    {
      "id": "rail-pritz-southville",
      "name": "Порт Приц — Саутвилл",
      "kind": "train",
      "classificationLabel": "Подтверждено направление в графство; точная станция не названа",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-1204-19965"
        ],
        "claim": "Дориан отправляется на вокзал Прица, чтобы ехать в Саутвилл.",
        "note": "Southville — область/графство на карте; точная станция в главе не указана.",
        "geometry": "schematic"
      }
    },
    {
      "id": "rail-blue-mountain",
      "name": "Железные дороги острова Синей горы / Рорстедская компания",
      "kind": "train",
      "classificationLabel": "Региональная сеть подтверждена; станции не перечислены",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-542-9048",
          "book-554-9274",
          "book-558-9345"
        ],
        "claim": "На острове Синей горы колониальная администрация построила несколько важных железных дорог между промышленными городами. Названа Рорстедская железнодорожная компания. Из Байама видны железнодорожные линии; добыча и металлургия находятся в других городах острова.",
        "note": "Не придумывать названия станций и конкретный полный граф. Допустима зона существующей ж/д сети или отдельно подписанная схема.",
        "geometry": "schematic"
      }
    },
    {
      "id": "rail-bayam-new-silver",
      "name": "Байам — Новый Серебряный город",
      "kind": "train",
      "classificationLabel": "Проект в указанной главе, не действующая линия",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-1292-21521",
          "book-1323-22056"
        ],
        "claim": "Даниц обещает расширить дорогу и построить железную дорогу к новому городу Серебра. Железную дорогу, соединяющую новый Серебряный город с другими городами, ещё требуют построить как можно скорее.",
        "note": "В указанных главах это проект, а не действующий поезд. Новый город расположен за лесом рядом с естественной гаванью; точных координат нет.",
        "geometry": "schematic"
      }
    },
    {
      "id": "metro-backlund",
      "name": "Паровoe метро Бэклунда",
      "kind": "train",
      "classificationLabel": "Городское метро: сеть подтверждена, мировой трассы нет",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-214-3475",
          "book-215-3486",
          "book-268-4366"
        ],
        "claim": "Метро возникло примерно за 25 лет до событий; сначала связывало берега Тассока, затем основные районы. Клейн выходит на одной из трёх станций метро района Черуд; поездка около 20 минут. Документирован выход метро на южном берегу Тассока.",
        "note": "Подтверждено городское метро, но в книге нет пригодной для карты мира полной схемы с координатами. Не рисовать вымышленные линии по материковой карте как точный канон.",
        "geometry": "schematic"
      }
    },
    {
      "id": "rail-western-company",
      "name": "Western Railway / Западная железная дорога",
      "kind": "train",
      "classificationLabel": "Названа компания; география линий не установлена",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-325-5318"
        ],
        "claim": "В разговоре биржевиков названы акции Western Railway.",
        "note": "Само название компании не доказывает маршрут Трир—Бэклунд или иной набор городов.",
        "geometry": "schematic"
      }
    },
    {
      "id": "rail-limon-station",
      "name": "Вокзал Лимона",
      "kind": "train",
      "classificationLabel": "Станция известна, направление не названо",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-1315-21940"
        ],
        "claim": "Клейн покидает Лимон поездом.",
        "note": "Направление и конечная станция в данном месте не названы; нельзя добавлять Лимон—Констант как подтверждённый прямой рейс.",
        "geometry": "schematic"
      }
    },
    {
      "id": "rail-utopia-backlund",
      "name": "Аномальная станция Утопия — Бэклунд",
      "kind": "train",
      "classificationLabel": "Сюжетная аномалия без постоянной мировой привязки",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-1330-22171",
          "book-1333-22234"
        ],
        "claim": "Вендель едет поездом к Бэклунду; поезд из-за бури останавливается в Утопии. На настоящих линиях Дези—Бэклунд станции Утопия нет.",
        "note": "Сверхъестественно присоединённая остановка, не постоянная географическая ветка. Выносить в сюжетный слой без фиктивных фиксированных координат.",
        "geometry": "schematic"
      }
    },
    {
      "id": "rail-utopia-freight",
      "name": "Утопия — порт (местная грузовая линия)",
      "kind": "train",
      "classificationLabel": "Сюжетная аномалия без постоянной мировой привязки",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-1328-22141"
        ],
        "claim": "Клейн создаёт грузовую железную дорогу от города Утопии до гавани, примерно в 3 км.",
        "note": "Локальная искусственная/сверхъестественная система Утопии; не регулярная материковая линия.",
        "geometry": "schematic"
      }
    },
    {
      "id": "rail-military-harbor",
      "name": "Портовые военные грузовые пути",
      "kind": "train",
      "classificationLabel": "Локальные грузовые пути без конечных станций",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-880-14611"
        ],
        "claim": "У охраняемой гавани показаны грузовые железнодорожные пути и ожидающий паровоз.",
        "note": "Конечные станции не названы; недостаточно данных для новой регулярной пассажирской линии.",
        "geometry": "schematic"
      }
    },
    {
      "id": "rail-that-corner-island",
      "name": "Короткая линия неназванного острова (эпилог «Этот уголок»)",
      "kind": "train",
      "classificationLabel": "Эпилог / сновидение, вне обычной карты мира",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-1431-0"
        ],
        "claim": "На необычном острове показан паровоз и рельсы к городу длиной лишь100–200метров.",
        "note": "Сюжетный неназванный остров без постоянных координат; не наносить какобычную материковую/Рорстедскую железнуюдорогу.",
        "geometry": "schematic"
      }
    },
    {
      "id": "passenger-daytime",
      "name": "Пассажирские поезда после наступления темноты",
      "kind": "train",
      "classificationLabel": "Ограничение сети в указанной главе",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-126-2013",
          "book-126-2016"
        ],
        "claim": "В ранней сцене поясняется, что после наступления темноты почти нет поездов, перевозящих людей, из-за отсутствия электрического освещения. Самый ранний упомянутый поезд отправляется в семь утра.",
        "note": "Это не полное расписание всех поездов мира; позже ночные сцены/грузовые и военные рейсы требуют отдельного контекста.",
        "geometry": "schematic"
      }
    },
    {
      "id": "no-brindisi-direct",
      "name": "Бухта Бриндизи: прямой железной дороги нет",
      "kind": "train",
      "classificationLabel": "Ограничение сети в указанной главе",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-17-304"
        ],
        "claim": "Розанна сетует на отсутствие прямой железной дороги до Brindisi Bay и необходимость плыть кораблём.",
        "note": "Не дорисовывать прямую линию до бухты как подтверждённую на этот момент. Русская редакция называет Деси; английский текст Brindisi Bay, поэтому сохранить исходное имя и отметить переводное расхождение.",
        "geometry": "schematic"
      }
    },
    {
      "id": "saint-havre-rorsted",
      "name": "Saint Havre: Приц — Рорстедский архипелаг",
      "kind": "ship",
      "classificationLabel": "Поездка / сообщение без точной трассы и полного расписания",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-490-8148"
        ],
        "claim": "Saint Havre и White Agate названы подходящими пассажирскими судами, направляющимися в Рорстедский архипелаг.",
        "note": "Конкретные промежуточные остановки и конечная гавань Saint Havre в этом месте не перечислены. Нельзя без пометки приписывать ему полный маршрут White Agate.",
        "geometry": "schematic",
        "vessel": "Saint Havre"
      }
    },
    {
      "id": "dilynius-gargas-transfer",
      "name": "Пересадка в Дилимиусе: продолжение в Гаргас",
      "kind": "ship",
      "classificationLabel": "Регион назначения подтверждён; порт прибытия не указан",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-574-9624",
          "book-575-9630"
        ],
        "claim": "Клейн и Даниц садятся на лайнер к гавани Дилимиуса; ожидаемое время — десять часов. Безопасный путь из Байама в Дилимиус извилист; после прибытия покупаются новые билеты и следующая поездка заканчивается в Гаргасе на рассвете.",
        "note": "В Дилимиусе происходит пересадка/покупка новых билетов. Название конечного порта Гаргаса здесь не уточнено: Нас можно использовать лишь как отмеченную реконструкцию.",
        "geometry": "schematic",
        "canonicalDuration": "Байам — Дилимиус: 10 часов"
      }
    },
    {
      "id": "bayam-east-balam-tickets",
      "name": "Билеты Байам — Восточный Балам",
      "kind": "ship",
      "classificationLabel": "Поездка / сообщение без точной трассы и полного расписания",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-592-9928",
          "book-592-9929"
        ],
        "claim": "Дарквилл направляется в билетную компанию гавани Байама. Он становится в очередь на лайнер в Восточный Балам.",
        "note": "Подтверждается наличие продаваемого направления, но конечный порт и конкретный рейс не названы.",
        "geometry": "schematic"
      }
    },
    {
      "id": "future-gargas-toscarter",
      "name": "Future: Нас — восточные опасные воды — Тоскартер",
      "kind": "ship",
      "classificationLabel": "Поездка / сообщение без точной трассы и полного расписания",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-634-10626",
          "book-674-11337"
        ],
        "claim": "Клейн договаривается встретиться с Каттлеей в Насе и затем отправиться на её корабле в опасные восточные воды моря Сони. После экспедиции Future приходит в порт Тоскартера, где Клейн сходит с корабля.",
        "note": "Пиратский/мистический экспедиционный корабль. Прямая линия Нас — Тоскартер не является описанной трассой; нельзя выдавать этот путь за регулярный пароходный график.",
        "geometry": "schematic",
        "vessel": "Future / Будущее"
      }
    },
    {
      "id": "golden-dream-sonia",
      "name": "Golden Dream: посещения острова Соня",
      "kind": "ship",
      "classificationLabel": "Поездка / сообщение без точной трассы и полного расписания",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-703-11809"
        ],
        "claim": "Эдвина сообщает, что Golden Dream часто посещает остров Соня.",
        "note": "Подтверждены посещения, но не регулярный публичный паром, исходная гавань или фиксированное расписание.",
        "geometry": "schematic",
        "vessel": "Golden Dream / Золотая мечта"
      }
    },
    {
      "id": "golden-dream-behrens",
      "name": "Golden Dream: приход в Беренс через море Тумана",
      "kind": "ship",
      "classificationLabel": "Поездка / сообщение без точной трассы и полного расписания",
      "evidence": {
        "status": "documented",
        "sourceIds": [
          "book-893-14812"
        ],
        "claim": "Golden Dream идёт на юг по морю Тумана, и Даниц через несколько дней прибывает в Беренс — северную гавань Западного Балама.",
        "note": "Названо направление по морю и порт посещения; не установлены исходная гавань и регулярный рейс.",
        "geometry": "schematic",
        "vessel": "Golden Dream / Золотая мечта"
      }
    }
  ]
};
if(typeof module==='object'&&module.exports)module.exports=data;else root.LotMTransportAtlas=data;
})(typeof globalThis!=='undefined'?globalThis:this);
