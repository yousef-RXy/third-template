import type * as main from "../main";
const { hi } = jest.requireActual<typeof main>("../main.ts");

test("guaranteed random", () => {
	expect(hi()).toBe("hi");
});
