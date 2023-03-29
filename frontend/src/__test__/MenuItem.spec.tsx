import { render, screen } from "@testing-library/react";
import MenuItem, { MenuItemProps } from "../components/MenuItem";

describe("<MenuItem />", () => {
  const props: MenuItemProps = {
    index: 1,
    image: "test",
    name: "test",
    fullPrice: 100,
    discountPrice: 10,
    isOutOfStock: true,
    isDiscounted: true,
    handleOpenModal: () => {},
  };

  it("should render (หมด) when isOutOfStock is true", () => {
    render(<MenuItem {...props} />);
    expect(screen.getByText(`${props.name} (หมด)`)).toBeInTheDocument();
  });
});
