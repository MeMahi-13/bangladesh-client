
const AddMedicines = () => {
  const handleAddMedicines = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    // Convert FormData to an object
    const Medicinedata = Object.fromEntries(formData.entries());
    console.log(Medicinedata);

    fetch('http://localhost:3000/medicines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Medicinedata),
    });
  };

  return (
    <div>
      <h1 className="text-3xl text-center p-5">Add Medicines</h1>
      <form
        onSubmit={handleAddMedicines}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 max-w-6xl mx-auto"
      >
        {/* Medicine Name */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Medicine Name</legend>
          <input
            type="text"
            name="medicineName"
            className="input input-bordered w-full"
            placeholder="Enter medicine name"
            required
          />
          <p className="label">Required</p>
        </fieldset>

        {/* Generic Name */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Generic Name</legend>
          <input
            type="text"
            name="genericName"
            className="input input-bordered w-full"
            placeholder="Enter generic name"
            required
          />
          <p className="label">Required</p>
        </fieldset>

        {/* Dosage */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Dosage</legend>
          <input
            type="text"
            name="dosage"
            className="input input-bordered w-full"
            placeholder="e.g., 500mg"
          />
          <p className="label">Optional</p>
        </fieldset>

        {/* Manufacturer */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Manufacturer</legend>
          <input
            type="text"
            name="manufacturer"
            className="input input-bordered w-full"
            placeholder="Enter manufacturer name"
            required
          />
          <p className="label">Required</p>
        </fieldset>

        {/* Price */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Price (BDT)</legend>
          <input
            type="number"
            name="price"
            className="input input-bordered w-full"
            placeholder="Enter price"
            min="0"
            step="0.01"
            required
          />
          <p className="label">Required</p>
        </fieldset>

        {/* Side Effects */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Side Effects</legend>
          <textarea
            name="sideEffects"
            className="textarea textarea-bordered w-full"
            placeholder="List known side effects (e.g., nausea, dizziness, rash)"
          ></textarea>
          <p className="label">Optional</p>
        </fieldset>

        {/* Description */}
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4 md:col-span-2">
          <legend className="fieldset-legend">Description</legend>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            placeholder="Enter description"
            rows="4"
          ></textarea>
          <p className="label">Optional</p>
        </fieldset>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center">
          <button type="submit" className="btn btn-primary">
            Add Medicine
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMedicines;
