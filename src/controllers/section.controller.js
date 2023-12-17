const Section = require("../models/section.model");

module.exports = {
  getAllSections: async () => {
    const sections = await Section.find().populate("advisor");
    const segs = sections.map((section) => {
      return { ...section._doc, advisorName: section.advisor?.name ?? 'No Advisor' };
    });
    return segs;
  },

  getByGrades: async (gradeLevel) => {
    const sections = await Section.find({ gradeLevel })
    return sections;
  },  

  findById: async (id) => {
    try {
      const section = await Section.findById(id).populate("advisor");
      return { ...section._doc, advisorEmail: section.advisor?.email ?? 'No Advisor' };
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  createSection: async (data) => {
    const section = await Section.create(data);
    return section;
  },

  editSection: async (id, data) => {
    const section = await Section.findByIdAndUpdate(id, data);
    return section;
  },

  deleteById: async (id) => {
    await Section.findByIdAndDelete(id);
  },
};
