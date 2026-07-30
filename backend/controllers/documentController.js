const fs = require("fs");
const path = require("path");

const Document = require("../models/Document");


// ==========================
// Upload Document
// ==========================

const uploadDocument = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a document",
      });
    }


    const document = await Document.create({

      customer: req.body.customer,

      policy: req.body.policy || null,

      documentType: req.body.documentType,

      fileName: req.file.originalname,

      filePath: req.file.path,

      fileSize: req.file.size,

      fileType: req.file.mimetype,

      uploadedBy: req.user._id,

    });


    res.status(201).json({

      success: true,

      message: "Document uploaded successfully",

      document,

    });


  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};




// ==========================
// Get All Documents
// ==========================

const getAllDocuments = async (req, res) => {

  try {


    const documents = await Document.find()

      .populate({

        path: "customer",

        populate: {

          path: "user",

          select: "name email",

        },

      })

      .populate(
        "policy",
        "policyNumber policyType"
      )

      .populate(
        "uploadedBy",
        "name email role"
      )

      .sort({
        createdAt: -1
      });



    res.status(200).json({

      success: true,

      count: documents.length,

      documents,

    });


  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};





// ==========================
// Get Document By ID
// ==========================

const getDocumentById = async (req, res) => {

  try {


    const document = await Document.findById(req.params.id)

      .populate({

        path: "customer",

        populate: {

          path: "user",

          select: "name email",

        },

      })

      .populate(
        "policy",
        "policyNumber policyType"
      )

      .populate(
        "uploadedBy",
        "name email role"
      );



    if (!document) {

      return res.status(404).json({

        success: false,

        message: "Document not found",

      });

    }



    res.status(200).json({

      success: true,

      document,

    });



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};





// ==========================
// Update Document
// ==========================

const updateDocument = async (req, res) => {

  try {


    const document = await Document.findById(
      req.params.id
    );


    if (!document) {

      return res.status(404).json({

        success: false,

        message: "Document not found",

      });

    }



    // If new file uploaded

    if (req.file) {


      // Delete old file

      if (

        document.filePath &&

        fs.existsSync(document.filePath)

      ) {

        fs.unlinkSync(document.filePath);

      }



      document.fileName =
        req.file.originalname;


      document.filePath =
        req.file.path;


      document.fileSize =
        req.file.size;


      document.fileType =
        req.file.mimetype;


    }




    // Update Details

    document.customer =
      req.body.customer || document.customer;



    document.policy =
      req.body.policy || null;



    document.documentType =
      req.body.documentType ||
      document.documentType;




    await document.save();



    res.status(200).json({

      success: true,

      message: "Document updated successfully",

      document,

    });



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};





// ==========================
// Download Document
// ==========================

const downloadDocument = async (req, res) => {

  try {


    const document = await Document.findById(
      req.params.id
    );



    if (!document) {

      return res.status(404).json({

        success: false,

        message: "Document not found",

      });

    }




    if (

      !document.filePath ||

      !fs.existsSync(document.filePath)

    ) {


      return res.status(404).json({

        success: false,

        message: "File not found on server",

      });


    }




    res.download(

      path.resolve(document.filePath),

      document.fileName

    );



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};






// ==========================
// Delete Document
// ==========================

const deleteDocument = async (req, res) => {

  try {


    const document = await Document.findById(
      req.params.id
    );


    if (!document) {

      return res.status(404).json({

        success: false,

        message: "Document not found",

      });

    }




    // Delete File

    if (

      document.filePath &&

      fs.existsSync(document.filePath)

    ) {

      fs.unlinkSync(document.filePath);

    }




    await document.deleteOne();




    res.status(200).json({

      success: true,

      message: "Document deleted successfully",

    });



  } catch (error) {


    res.status(500).json({

      success: false,

      message: error.message,

    });


  }

};





module.exports = {

  uploadDocument,

  getAllDocuments,

  getDocumentById,

  updateDocument,

  downloadDocument,

  deleteDocument,

};