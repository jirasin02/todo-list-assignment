import {
  shortMenuResponseToMenuInfo,
  menuResponseToMenuDetail,
} from "../mappers/menu";
import { restaurantResponseToRestaurantInfo } from "../mappers/restaurant";
import { FullMenuResponse, ShortMenuResponse } from "../types/models/menu";
import { RestaurantResponse } from "../types/models/restaurant";

describe("Coverting restaurant response to restaurant info", () => {
  const currentDate = new Date();
  currentDate.setHours(12);
  currentDate.setMinutes(0);
  const restaurantResponse: RestaurantResponse[] = [
    {
      id: 1,
      name: "Restaurant 1",
      coverImage: "https://www.google.com",
      menus: [],
      activeTimePeriod: {
        open: "08:00",
        close: "22:00",
      },
    },
    {
      id: 2,
      name: "Restaurant 2",
      coverImage: "https://www.google.com",
      menus: [],
      activeTimePeriod: {
        open: "18:00",
        close: "22:00",
      },
    },
  ];

  test("It should map from response to restaurant info correctly", () => {
    expect(
      restaurantResponseToRestaurantInfo(restaurantResponse, currentDate)
    ).toEqual([
      {
        id: 1,
        name: "Restaurant 1",
        coverImage: "https://www.google.com",
        isOpen: true,
        activeTimePeriod: {
          open: "08:00",
          close: "22:00",
        },
      },
      {
        id: 2,
        name: "Restaurant 2",
        coverImage: "https://www.google.com",
        isOpen: false,
        activeTimePeriod: {
          open: "18:00",
          close: "22:00",
        },
      },
    ]);
  });
});

describe("Coverting short menu response to menu info", () => {
  const currentDate = new Date();
  currentDate.setHours(11);
  currentDate.setMinutes(0);
  const shortMenuResponse: ShortMenuResponse[] = [
    {
      id: "1",
      name: "Menu 1",
      thumbnailImage: "https://www.google.com",
      discountedPercent: 0,
      fullPrice: 100,
      sold: 100,
      totalInStock: 100,
      discountedTimePeriod: {
        begin: "10:00",
        end: "12:00",
      },
    },
    {
      id: "2",
      name: "Menu 2",
      thumbnailImage: "https://www.google.com",
      discountedPercent: 100,
      fullPrice: 100,
      sold: 100,
      totalInStock: 200,
      discountedTimePeriod: {
        begin: "14:00",
        end: "18:00",
      },
    },
  ];

  test("It should map from response to menu info correctly", () => {
    expect(shortMenuResponseToMenuInfo(shortMenuResponse, currentDate)).toEqual(
      [
        {
          id: "1",
          name: "Menu 1",
          thumbnailImage: "https://www.google.com",
          fullPrice: 100,
          discountedPrice: 100,
          isDiscounted: true,
          isOutOfStock: true,
        },
        {
          id: "2",
          name: "Menu 2",
          thumbnailImage: "https://www.google.com",
          fullPrice: 100,
          discountedPrice: 0,
          isDiscounted: false,
          isOutOfStock: false,
        },
      ]
    );
  });
});

describe("Coverting full menu response to menu detail", () => {
  const currentDate = new Date();
  currentDate.setHours(12);
  currentDate.setMinutes(0);

  const fullMenuResponse: FullMenuResponse = {
    name: "Menu 1",
    id: "1",
    fullPrice: 100,
    discountedPercent: 100,
    options: [
      {
        label: "Option 1",
        choices: [
          {
            label: "Choice 1",
          },
          {
            label: "Choice 2",
          },
        ],
      },
    ],
    thumbnailImage: "https://www.google.com",
    largeImage: "https://www.google.com",
    sold: 100,
    totalInStock: 200,
    discountedTimePeriod: {
      begin: "10:00",
      end: "13:00",
    },
  };

  test("It should map from response to menu detail correctly", () => {
    expect(menuResponseToMenuDetail(fullMenuResponse, currentDate)).toEqual({
      id: "1",
      name: "Menu 1",
      thumbnailImage: "https://www.google.com",
      largeImage: "https://www.google.com",
      fullPrice: 100,
      discountedPrice: 0,
      isDiscounted: true,
      isOutOfStock: false,
      options: [
        {
          label: "Option 1",
          choices: [
            {
              label: "Choice 1",
            },
            {
              label: "Choice 2",
            },
          ],
        },
      ],
    });
  });

  test("It should map from response to menu detail correctly", () => {
    const mockProps = {
      ...fullMenuResponse,
      id: "2",
      name: "Menu 2",
      discountedPercent: 0,
      totalInStock: 100,
      discountedTimePeriod: {
        begin: "19:00",
        end: "20:00",
      },
    };
    expect(menuResponseToMenuDetail(mockProps, currentDate)).toEqual({
      id: "2",
      name: "Menu 2",
      thumbnailImage: "https://www.google.com",
      largeImage: "https://www.google.com",
      fullPrice: 100,
      discountedPrice: 100,
      isDiscounted: false,
      isOutOfStock: true,
      options: [
        {
          label: "Option 1",
          choices: [
            {
              label: "Choice 1",
            },
            {
              label: "Choice 2",
            },
          ],
        },
      ],
    });
  });
});
