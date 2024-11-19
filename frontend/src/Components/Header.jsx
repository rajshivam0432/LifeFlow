import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // Safely retrieve and parse donor and hospital data
  let parsedDonor = null;
  let parsedHospital = null;

  try {
    const donorData = localStorage.getItem("donor");
    const hospitalData = localStorage.getItem("hospital");

    if (donorData) {
      parsedDonor = JSON.parse(donorData);
    }
    if (hospitalData) {
      parsedHospital = JSON.parse(hospitalData);
    }
  } catch (error) {
    console.error("Error parsing user data:", error.message);
  }

  const handleLogout = async () => {
    try {
      localStorage.removeItem("donor");
      localStorage.removeItem("hospital");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png" // Replace with your image path or URL
              alt="Logo"
              className="h-12 mr-3"
            />
          </Link>

          {/* Login / User Greeting */}
          <div className="hidden lg:flex items-center lg:order-2">
            {parsedDonor || parsedHospital ? (
              <span className="text-gray-700 flex items-center">
                Hello,{" "}
                {parsedDonor?.userId?.name || parsedHospital?.name || "User"}
                <button
                  onClick={handleLogout}
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 ml-3"
                >
                  Logout
                </button>
              </span>
            ) : (
              <Link
                to="/login-donor"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2"
              >
                Login
              </Link>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-between w-full lg:w-auto lg:order-1">
            <ul className="flex flex-row lg:space-x-8 lg:mt-0 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } py-2 pr-4 pl-3 duration-200 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } py-2 pr-4 pl-3 duration-200 hover:text-orange-700 lg:p-0`
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } py-2 pr-4 pl-3 duration-200 hover:text-orange-700 lg:p-0`
                  }
                >
                  Contact Us
                </NavLink>
              </li>
              {parsedHospital && (
                <li>
                  <NavLink
                    to="/hospital-dashboard"
                    className={({ isActive }) =>
                      `block ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } py-2 pr-4 pl-3 duration-200 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Hospital Dashboard
                  </NavLink>
                </li>
              )}
              {parsedDonor && (
                <li>
                  <NavLink
                    to="/hospitalist"
                    className={({ isActive }) =>
                      `block ${
                        isActive ? "text-orange-700" : "text-gray-700"
                      } py-2 pr-4 pl-3 duration-200 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Hospital List
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
