import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: { 
        type: String, 
        default: "" 
    },
    category: { 
        type: String, 
        required:true, 
        enum: ["salary", "groceries", "entertainment", "bills", "transport", "savings", "other"],
        trim: true, 
    },
    date: { 
        type: Date, 
        required: true, 
        default: Date.now 
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);

export default Transaction;