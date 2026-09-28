import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tight">
            Shehar <span className="text-blue-400">Flow</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/about"
              className="text-sm text-slate-300 hover:text-white hidden sm:block"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-sm text-slate-300 hover:text-white hidden sm:block"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="text-sm bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium transition"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="max-w-3xl">
          <p className="text-blue-400 text-sm font-medium mb-3 tracking-wide uppercase">
            City Traffic Intelligence
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            See where Karachi’s roads break — before the jam does
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Shehar Flow helps traffic police and municipal teams track motorcycle
            conflict zones, informal parking, and delivery-bike bottlenecks on
            one live map — with alerts, analytics, and exportable reports.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Open Dashboard
            </Link>
            <Link
              to="/contact"
              className="border border-slate-600 hover:border-slate-400 px-6 py-3 rounded-lg font-medium transition"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl font-semibold mb-2">Built for real road problems</h2>
          <p className="text-slate-400 mb-10 max-w-2xl">
            Not generic “smart city” dashboards — focused on the patterns that
            actually slow Pakistani cities down.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center text-sm font-bold mb-4">
                01
              </div>
              <h3 className="font-semibold text-lg mb-2">Motorcycle conflict</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Mixed traffic creates high-risk weaving points. Mark and monitor
                intersections where bikes and cars clash most.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center text-sm font-bold mb-4">
                02
              </div>
              <h3 className="font-semibold text-lg mb-2">Informal parking</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Encroachments and roadside parking shrink lane capacity. Track
                zones that repeatedly choke service roads.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-bold mb-4">
                03
              </div>
              <h3 className="font-semibold text-lg mb-2">Delivery bike impact</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Food and e-commerce bikes cluster at peak hours. Spot these
                micro-jams before they spill into main arteries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-10">What teams get</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              title: 'Live operational map',
              desc: 'Karachi-focused map with severity-colored markers and popup detail for every hotspot.',
            },
            {
              title: 'Role-based access',
              desc: 'Viewers observe. Operators act. Admins manage hotspots and oversight.',
            },
            {
              title: 'Alerts & analytics',
              desc: 'Critical events in a live feed, plus charts by type and severity.',
            },
            {
              title: 'Built for municipal use',
              desc: 'Contact channel for custom reports and infrastructure integration requests.',
            },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <div className="w-1.5 rounded-full bg-blue-500 shrink-0" />
              <div>
                <h3 className="font-medium mb-1">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            For traffic police, municipal staff, and safe-city teams
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Start with Karachi. Expand city by city. Request a walkthrough if you
            need a custom deployment.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition"
            >
              Staff Login
            </Link>
            <Link
              to="/contact"
              className="border border-slate-600 hover:border-slate-400 px-6 py-3 rounded-lg font-medium transition"
            >
              Contact for Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-slate-500">
          <span>Shehar Flow — City Traffic Intelligence</span>
          <span>Focused on Pakistani urban roads</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;