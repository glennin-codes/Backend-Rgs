import RealEsatate from "../../Models/realEstate.js";

export const removeAll = async (req, res) => {
    try {
        const result = await RealEsatate.deleteMany(
            {}
        );
        if (result.deletedCount > 0) {
            res.status(200).json({
                message: "Deleted Successfully",
                deletedCount: result.deletedCount,
            });
        } else {
            res.status(404).json({
                message: "No data found to delete",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
