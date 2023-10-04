import Filter from "../../../components/Filter/Filter";

function FilterTask() {
  return (
    <section className="mb-4 flex justify-between items-center">
      <Filter />
      <div className="relative bg-blue-500 p-8 rounded-bl-3xl">
        <div className="absolute bg-blue-500 w-12 h-12 top-0 -left-12">
          <div className="bg-white w-full h-full rounded-tr-full rounded-tl-none rounded-br-none rounded-bl-none "></div>
        </div>

        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            className="object-cover object-center w-full h-full z-10"
            src="https://upload.wikimedia.org/wikipedia/commons/5/50/STS41B-35-1613_-_Bruce_McCandless_II_during_EVA_%28Retouched%29.jpg"
            alt=""
          />
        </div>

        <div className="absolute bg-blue-500 w-12 h-12 -bottom-12 right-0">
          <div className="bg-white w-full h-full rounded-tr-full rounded-tl-none rounded-br-none rounded-bl-none "></div>
        </div>
      </div>
    </section>
  );
}

export default FilterTask;
