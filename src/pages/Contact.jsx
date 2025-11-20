export default function Contact() {
  return (
    <div className="pt-24 px-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600">Contact Us</h1>

      <form className="mt-6 space-y-4">

        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg"
        />

        <textarea
          placeholder="Your Message"
          className="w-full p-3 border rounded-lg h-32"
        ></textarea>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
          Send Message
        </button>

      </form>
    </div>
  );
}
