import { Application } from "stimulus";
import ToggleController from "../src/controllers/toggle_controller";
import { fireEvent, getByTestId } from "@testing-library/dom";
import { cleanupDOM, mountDOM } from "./utils";

const startStimulus = () => {
  const application = Application.start();
  application.register("toggle", ToggleController);
};

const HIDDEN_CLASS = "is-hidden";
let container = null;
let sidebar1 = null;
let sidebar2 = null;
let sidebar3 = null;
let sidebar4 = null;

describe("ToggleController", () => {
  beforeAll(() => {
    startStimulus();
  });

  afterEach(() => {
    cleanupDOM();
  });

  describe("using default hidden class", () => {
    beforeEach(() => {
      container = mountDOM(`
      <main data-controller="toggle">
      <button data-action="toggle#toggle" data-toggle-target="sidebar-1" data-testid="trigger-1">
        Toggle Sidebar 1
      </button>
      <button data-action="toggle#toggle" data-toggle-target="sidebar-1,sidebar-2" data-testid="trigger-2">
        Toggle Sidebar 1 & 2
      </button>
      <button data-action="toggle#toggle" data-toggle-target="sidebar-3" data-testid="trigger-3">
        Toggle Sidebar 3
      </button>
      <button data-action="toggle#toggle" data-toggle-target="sidebar-3,sidebar-4" data-testid="trigger-4">
        Toggle Sidebar 3 & 4
      </button>
      <button data-action="toggle#toggle" data-toggle-target="sidebar-1,sidebar-4" data-testid="trigger-5">
        Toggle Sidebar 1 & 4
      </button>
      <hr />
      <aside class="is-hidden" data-toggle-name="sidebar-1" data-testid="sidebar-1">
        <p>Here's "Sidebar 1".</p>
      </aside>
      <aside class="is-hidden" data-toggle-name="sidebar-2" data-testid="sidebar-2">
        <p>Here's "Sidebar 2".</p>
      </aside>
      <aside data-toggle-name="sidebar-3" data-testid="sidebar-3">
        <p>Here's "Sidebar 3".</p>
      </aside>
      <aside data-toggle-name="sidebar-4" data-testid="sidebar-4">
        <p>Here's "Sidebar 4".</p>
      </aside>
    </main>
    `);
      sidebar1 = getByTestId(container, "sidebar-1");
      sidebar2 = getByTestId(container, "sidebar-2");
      sidebar3 = getByTestId(container, "sidebar-3");
      sidebar4 = getByTestId(container, "sidebar-4");
    });

    test("toggles a single element on", () => {
      expect(sidebar1).toHaveClass(HIDDEN_CLASS);
      fireEvent.click(getByTestId(container, "trigger-1"));
      expect(sidebar1).not.toHaveClass(HIDDEN_CLASS);
    });

    test("toggles a single element off", () => {
      expect(sidebar3).not.toHaveClass(HIDDEN_CLASS);
      fireEvent.click(getByTestId(container, "trigger-3"));
      expect(sidebar3).toHaveClass(HIDDEN_CLASS);
    });

    test("toggles multiple elements on", () => {
      expect(sidebar1).toHaveClass(HIDDEN_CLASS);
      expect(sidebar2).toHaveClass(HIDDEN_CLASS);

      fireEvent.click(getByTestId(container, "trigger-2"));

      expect(sidebar1).not.toHaveClass(HIDDEN_CLASS);
      expect(sidebar2).not.toHaveClass(HIDDEN_CLASS);
    });

    test("toggles multiple elements off", () => {
      expect(sidebar3).not.toHaveClass(HIDDEN_CLASS);
      expect(sidebar4).not.toHaveClass(HIDDEN_CLASS);

      fireEvent.click(getByTestId(container, "trigger-4"));

      expect(sidebar3).toHaveClass(HIDDEN_CLASS);
      expect(sidebar4).toHaveClass(HIDDEN_CLASS);
    });

    test("toggles an element on and another off", () => {
      expect(sidebar1).toHaveClass(HIDDEN_CLASS);
      expect(sidebar4).not.toHaveClass(HIDDEN_CLASS);

      fireEvent.click(getByTestId(container, "trigger-5"));

      expect(sidebar1).not.toHaveClass(HIDDEN_CLASS);
      expect(sidebar4).toHaveClass(HIDDEN_CLASS);
    });
  });

  describe("using a custom hidden class", () => {
    const CUSTOM_HIDDEN_CLASS = "custom-hidden-class";

    beforeEach(() => {
      container = mountDOM(`
      <main data-controller="toggle" data-hidden-class="custom-hidden-class">
      <button data-action="toggle#toggle" data-toggle-target="sidebar-1" data-testid="trigger-1">
        Toggle Sidebar 1
      </button>
      <button data-action="toggle#toggle" data-toggle-target="sidebar-2" data-testid="trigger-2">
        Toggle Sidebar 2
      </button>
      <hr />
      <aside class="custom-hidden-class" data-toggle-name="sidebar-1" data-testid="sidebar-1">
        <p>Here's "Sidebar 1".</p>
      </aside>
      <aside data-toggle-name="sidebar-2" data-testid="sidebar-2">
        <p>Here's "Sidebar 2".</p>
      </aside>
    </main>
    `);
      sidebar1 = getByTestId(container, "sidebar-1");
      sidebar2 = getByTestId(container, "sidebar-2");
    });

    test("toggles a single element on", () => {
      expect(sidebar1).toHaveClass(CUSTOM_HIDDEN_CLASS);
      fireEvent.click(getByTestId(container, "trigger-1"));
      expect(sidebar1).not.toHaveClass(CUSTOM_HIDDEN_CLASS);
    });

    test("toggles a single element off", () => {
      expect(sidebar2).not.toHaveClass(CUSTOM_HIDDEN_CLASS);
      fireEvent.click(getByTestId(container, "trigger-2"));
      expect(sidebar2).toHaveClass(CUSTOM_HIDDEN_CLASS);
    });
  });
});
