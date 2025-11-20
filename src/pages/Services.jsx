export default function Services() {
  return (
    <div className="pt-24 px-10">
      <h1 className="text-3xl font-bold text-blue-600">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Web Development</h2>
          <p className="text-gray-600 mt-3">We build modern, fast websites.</p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Mobile Apps</h2>
          <p className="text-gray-600 mt-3">Android & iOS mobile solutions.</p>
        </div>

        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold">Software Development</h2>
          <p className="text-gray-600 mt-3">Custom secure software systems.</p>
        </div>

      </div>
    </div>
  );
}
