//const Fuse = require('fuse.js');

const apiFeatures = (query, querystr) => {
    const search = () => {
      const keyword = querystr.keyword
        ? {
            name: {
              $regex: querystr.keyword,
              $options: "i",
            },
          }
        : {};
      query = query.find({ ...keyword });
    };
  
  
    const filter = () => {
      
      // Build the filter object
      const filterObj = { ...querystr };
  
      // Remove fields from filterObj that are not required
      const removeFields = ["keyword", "limit", "page"];
      removeFields.forEach((el) => delete filterObj[el]);
  
      // Advance filter for price, ratings, etc.
      let queryString = JSON.stringify(filterObj);
      queryString = queryString.replace(
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`
      );
  
  
      query = query.find(JSON.parse(queryString));
  
        };
       /* const paginate = () => {
          const page = parseInt(querystr.page, 10) || 1;
          const limit = parseInt(querystr.limit, 10) || 8;
          const skipIndex = (page - 1) * limit;
        
          query = query.limit(limit).skip(skipIndex);
          return query;
        };*/
        const paginate = (limit) => {
          const currentPage = parseInt(querystr.page, 10) || 1;
          const skipIndex = (currentPage - 1) * limit;
        
          query = query.limit(limit).skip(skipIndex);
          return query;
        };
        
        
        return {
          search,
          filter,
          paginate,
        };
  };
  
  module.exports = apiFeatures;
  