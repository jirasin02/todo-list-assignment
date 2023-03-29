import RestaurantItem, {
  RestaurantItemProps,
} from "../components/RestaurantItem";
import { render, screen } from "@testing-library/react";

describe("<RestaurantItem />", () => {
  const props: RestaurantItemProps = {
    id: 1,
    image: "test",
    name: "test",
    openTime: "test",
    closeTime: "test",
    isOpen: true,
    navigateToRestaurant: () => {},
  };

  it("should render เปิด when isOpen is true", () => {
    render(<RestaurantItem {...props} />);
    expect(screen.getByText("เปิด")).toBeInTheDocument();
  });

  it("should render ปิด when isOpen is false", () => {
    const mockProps = {
      ...props,
      isOpen: false,
    };
    render(<RestaurantItem {...mockProps} />);
    expect(screen.getByText("ปิด")).toBeInTheDocument();
  });
});
