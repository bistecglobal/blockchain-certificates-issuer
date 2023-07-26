export default function DashboardContainer() {
  const items = [
    { title: 'Courses', link: '/courses', image: '/card-dash.jpg' },
    { title: 'Trainers', link: '/trainers', image: '/card-dash.jpg' },
    { title: 'Trainees', link: '/trainees', image: '/card-dash.jpg' },
    { title: 'Certificates', link: '/certificates', image: '/card-cer.jpg' },
  ];
  return (
    <>
      <div className="mx-auto px-4 py-16 text-center h-[100vh] center">
        <div>
          <h1 className="mb-20 mt-10 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-indigo-700 from-indigo-700 uppercase">
              Welcome!
            </span>
          </h1>
        </div>
        <div className="container mx-auto lg:p-4 lg:ml-[100px] ">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-1">
            {items.map((item, index) => (
              <div
                key={index}
                className="relative group max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg md:w-80 sm:w-64 sm:mb-20 mb-10 lg:w-96 xl:w-112 lg:mb-20 transform transition-transform duration-500 hover:scale-105"
              >
                <a href={item.link}>
                  <h1 className="text-2xl md:text-2xl lg:text-3xl bg-clip-text bg-gray-600 text-transparent font-bold">
                    {item.title}
                  </h1>
                  <img
                    className="rounded lg:w-[350px]"
                    src={item.image}
                    alt=""
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
