import axios from "axios";

const getAllCustomer = async (req, res) => {
  try {

    
    const data = await axios.get(
      "https://firstlucentapp.myshopify.com/admin/api/2023-01/customers.json",
      {
        headers: {
          "x-shopify-access-token": "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",
        },
      }
    );

    res.send(data?.data?.customers);
  } catch (error) {
    console.log(error);
  }
};

export { getAllCustomer };
