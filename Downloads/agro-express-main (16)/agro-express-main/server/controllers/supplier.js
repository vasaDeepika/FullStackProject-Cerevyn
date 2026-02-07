import Supplier from "../models/Supplier.js";

const postApisellsupplyes = async (req,res)=>{
    const {
      user,
      product,
      supplierPerson,
      contactNumber,
      vehical,
      vehicalRegNumber,
      from,
      to,
      
    }=req.body;
  
    try{
      const supplier = new Supplier({
        user,
        product,
        supplierPerson,
        contactNumber,
        vehical,
        vehicalRegNumber,
        from,
        to,
      })
  
      const saveSuppliers = await supplier.save();
      res.json({
        success: true,
        data: saveSuppliers,
        message: "Successfully added product from supplier."
      })
  
    }catch(err){
      res.json({
        success: false,
        message: err.message
      })
    }
  }

  export {postApisellsupplyes}