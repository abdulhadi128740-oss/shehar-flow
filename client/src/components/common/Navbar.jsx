import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path
      ? 'text-blue-400 border-b-2 border-blue-400'
      : 'text-slate-300 hover:text-white transition';

  return (
    <nav className="bg-slate-800/90 backdrop-blur border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="text-xl font-bold text-white tracking-tight">
            Shehar <span className="text-blue-400">Flow</span>
          </Link>

          <div className="hidden sm:flex gap-6 text-sm font-medium">
  <Link to="/dashboard" className={isActive('/dashboard')}>
    Dashboard
  </Link>
  {user?.role === 'admin' && (
    <Link to="/users" className={isActive('/users')}>
      Users
    </Link>
  )}
  <Link to="/about" className={isActive('/about')}>
    About
  </Link>
  <Link to="/contact" className={isActive('/contact')}>
    Contact
  </Link>
</div>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <>
              <div className="hidden sm:block text-right">
                <p className="text-sm text-white font-medium">{user.name}</p>
                <p className="text-xs text-slate-400 capitalize">{user.role}</p>
              </div>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-sm px-4 py-1.5 rounded-lg transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
