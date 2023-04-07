import { sortByDate, sortByStatus, sortByTitle } from "../utils/sortBy";
import { Todo } from "../types/todo";

describe("Filtering todo lists", () => {
  const todos: Todo[] = [
    {
      title: "This is a todo list :)",
      description:
        "Hello, welcome to my todo list website! Nice to meet you :)",
      isCompleted: true,
      date: "2023-04-01T15:49:54.457Z",
      id: 2,
    },
    {
      title: "Send the website link in email",
      description: "On 8th April",
      isCompleted: true,
      date: "2023-04-07T09:38:39.034Z",
      id: 7,
    },
    {
      title: "Add new todo list",
      description: "Try adding list into this todo list website.",
      isCompleted: false,
      date: "2023-03-17T15:50:44.449Z",
      id: 12,
    },
  ];

  test("It should filter by title", () => {
    expect(sortByTitle(todos)).toEqual([
      {
        title: "Add new todo list",
        description: "Try adding list into this todo list website.",
        isCompleted: false,
        date: "2023-03-17T15:50:44.449Z",
        id: 12,
      },
      {
        title: "Send the website link in email",
        description: "On 8th April",
        isCompleted: true,
        date: "2023-04-07T09:38:39.034Z",
        id: 7,
      },
      {
        title: "This is a todo list :)",
        description:
          "Hello, welcome to my todo list website! Nice to meet you :)",
        isCompleted: true,
        date: "2023-04-01T15:49:54.457Z",
        id: 2,
      },
    ]);
  });

  test("It should filter by status", () => {
    expect(sortByStatus(todos)).toEqual([
      {
        title: "Send the website link in email",
        description: "On 8th April",
        isCompleted: true,
        date: "2023-04-07T09:38:39.034Z",
        id: 7,
      },
      {
        title: "This is a todo list :)",
        description:
          "Hello, welcome to my todo list website! Nice to meet you :)",
        isCompleted: true,
        date: "2023-04-01T15:49:54.457Z",
        id: 2,
      },
      {
        title: "Add new todo list",
        description: "Try adding list into this todo list website.",
        isCompleted: false,
        date: "2023-03-17T15:50:44.449Z",
        id: 12,
      },
    ]);
  });

  test("It should filter by date", () => {
    expect(sortByDate(todos)).toEqual([
      {
        title: "Send the website link in email",
        description: "On 8th April",
        isCompleted: true,
        date: "2023-04-07T09:38:39.034Z",
        id: 7,
      },
      {
        title: "This is a todo list :)",
        description:
          "Hello, welcome to my todo list website! Nice to meet you :)",
        isCompleted: true,
        date: "2023-04-01T15:49:54.457Z",
        id: 2,
      },
      {
        title: "Add new todo list",
        description: "Try adding list into this todo list website.",
        isCompleted: false,
        date: "2023-03-17T15:50:44.449Z",
        id: 12,
      },
    ]);
  });
});
