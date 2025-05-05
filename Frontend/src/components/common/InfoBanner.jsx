import { Phone, PackageCheck, Smile, ShieldCheck } from "lucide-react";

const InfoBanner = () => {
  const items = [
    {
      icon: <Phone size={30} className="text-primary" />,
      title: "Give Us A Call",
      description: "+91 8446090922",
    },
    {
      icon: <PackageCheck size={30} className="text-primary" />,
      title: "Bulk Inquiry",
      description: "Email - info@sancotoys.com",
    },
    {
      icon: <Smile size={30} className="text-primary" />,
      title: "Sanco's Quality Assurance",
      description: "High Quality Products",
    },
    {
      icon: <ShieldCheck size={30} className="text-primary" />,
      title: "BIS Certified",
      description: "Products meet BIS safety standards",
    },
  ];

  return (
    <section className="w-full bg-white py-6 px-1">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-3 px-4"
          >
            {item.icon}
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfoBanner;
