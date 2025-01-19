import { NavLink } from "./NavLink";
import { HiringDropdown } from "./HiringDropdown";

export const NavLinks = () => {
  return (
    <>
      <NavLink href="/">Home</NavLink>
      <HiringDropdown />
      <NavLink href="/projects">Projecten</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </>
  );
};