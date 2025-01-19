import { NavLink } from "./NavLink";
import { HiringDropdown } from "./HiringDropdown";

export const NavLinks = () => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <HiringDropdown />
      <NavLink to="/projects">Projecten</NavLink>
      <NavLink to="/contact">Contact</NavLink>
    </>
  );
};