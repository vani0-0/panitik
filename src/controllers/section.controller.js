const Section = require("../models/section.model");

module.exports = {
  getAllSections: async () => {
    const sections = await Section.find().populate("advisor");
    console.log(sections);
    const segs = sections.map((section) => {
      return { ...section._doc, advisorName: section.advisor.name };
    });
    return segs;
  },

  createSection: async (data) => {
    const section = await Section.create(data);
    return section;
  },
};
