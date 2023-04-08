import { render } from "@testing-library/react";
import TodoItem, { TodoItemProps } from "../components/TodoItem";

describe("<TodoItem />", () => {
  const props: TodoItemProps = {
    todo: {
      id: 1,
      title: "Todo 1",
      description: "Todo 1 description",
      isCompleted: false,
      date: new Date().toISOString(),
    },
    handleEditTodo: () => {},
    handleDeleteTodo: () => {},
    handleChangeTodoState: () => {},
  };

  it("should render Todo title and uncheck box", () => {
    const { container } = render(<TodoItem {...props} />);
    const title = container.querySelector("#todo-title");
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe(props.todo.title);
    const uncheckBox = container.querySelector("#todo-unchecked");
    expect(uncheckBox).toBeInTheDocument();
  });

  it("should render Todo title and checked box", () => {
    const mockProps: TodoItemProps = {
      ...props,
      todo: {
        ...props.todo,
        isCompleted: true,
      },
    };
    const { container } = render(<TodoItem {...mockProps} />);
    const title = container.querySelector("#todo-title");
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toBe(mockProps.todo.title);
    const checkBox = container.querySelector("#todo-checked");
    expect(checkBox).toBeInTheDocument();
  });
});
