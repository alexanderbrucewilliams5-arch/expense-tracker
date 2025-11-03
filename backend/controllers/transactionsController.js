import Transaction from "../models/Transaction.js";
import { validationResult } from "express-validator";

// Create transaction
export const createTransaction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false, message: "Validation error occurred", errors: errors.array() });
    }

    const { type, amount, description, category, date } = req.body;
    const tx = new Transaction({ type, amount, description, category, date });
    await tx.save();
    res.status(201).json({ success:true, message: "Transaction created successfully", transaction: tx });
  } catch (error) {
    next(error);
  }
};

// Get transactions (with filters)
export const getTransactions = async (req, res, next) => {
  try {
    const { type, category, startDate, endDate, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate || endDate) filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ success:true, message: "Transactions fetched successfully", total, page: parseInt(page), limit: parseInt(limit), transactions });
  } catch (error) {
    next(error);
  }
};

// Get transaction by ID
export const getTransactionById = async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ success:false, message: "Transaction not found" });
    res.json({ success:true, message: "Transaction fetched successfully", transaction: tx });
  } catch (error) {
    next(error);
  }
};

// Update transaction
export const updateTransaction = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:false, message: "Validation error occurred", errors: errors.array() });
    }

    const tx = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tx) return res.status(404).json({ success:false, message: "Transaction not found" });
    res.json({ success:true, message: "Transaction updated successfully", transaction: tx });
  } catch (error) {
    next(error);
  }
};

// Delete transaction
export const deleteTransaction = async (req, res, next) => {
  try {
    const tx = await Transaction.findByIdAndDelete(req.params.id);
    if (!tx) return res.status(404).json({ success:false, message: "Transaction not found" });
    res.json({ success:true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Summary (income vs expense, grouped by category)
export const getSummary = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    const match = {};
    if (startDate || endDate) match.date = {};
    if (startDate) match.date.$gte = new Date(startDate);
    if (endDate) match.date.$lte = new Date(endDate);

    const summary = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: { type: "$type", category: "$category" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json({ success:true, message: "Summary fetched successfully", summary });
  } catch (error) {
    next(error);
  }
};