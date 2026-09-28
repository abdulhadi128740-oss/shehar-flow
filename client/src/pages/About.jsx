import Navbar from '../components/common/Navbar';
const About = () => {
  return (
  <div className="min-h-screen bg-slate-900 text-white">
    <Navbar />
    <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">About Shehar Flow</h1>

        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
          Shehar Flow is a city traffic intelligence platform designed for Pakistani cities.
          It helps municipal staff and traffic authorities understand real problems on the roads.
        </p>

        <h2 className="text-2xl font-semibold mb-4">What Problems Does It Solve?</h2>

        <div className="space-y-6 mb-10">
          <div className="bg-slate-800 p-5 rounded-xl">
            <h3 className="text-xl font-medium mb-2">1. Mixed Traffic & Motorcycle Conflict</h3>
            <p className="text-slate-400">
              Pakistani roads have a very high number of motorcycles mixed with cars, rickshaws, and buses.
              This creates dangerous conflict points. Shehar Flow highlights these high-risk locations.
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl">
            <h3 className="text-xl font-medium mb-2">2. Informal Parking & Encroachments</h3>
            <p className="text-slate-400">
              Illegal parking and shop extensions reduce road capacity and cause congestion.
              The platform monitors and reports these problem zones.
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-xl">
            <h3 className="text-xl font-medium mb-2">3. Delivery Bike Impact</h3>
            <p className="text-slate-400">
              Food delivery and e-commerce bikes often stop in the middle of roads, creating sudden bottlenecks.
              Shehar Flow tracks these high-impact areas.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Who Is It For?</h2>
        <p className="text-slate-300 mb-8">
          Traffic Police, Municipal Corporations, City Administrations, and Safe City authorities.
        </p>

        <a
          href="/dashboard"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
};

export default About;