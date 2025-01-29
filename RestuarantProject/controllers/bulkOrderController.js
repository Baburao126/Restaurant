const bulkOrderModel=require('../models/bulkOrders');

const createBulkOrder = async (req, res) => {
    try {
        const newOrder = await bulkOrderModel.create(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        console.error('Error creating bulk order:', error);
        res.status(400).json({ error: 'Failed to create bulk order' });
    }
};

const getBulkOrderById = async (req, res) => {
    const { userId } = req.body;
    try {
        const order = await bulkOrderModel.findAll({where:{userId}});
        if (!order) {
            return res.status(404).json({ error: 'Bulk order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching bulk order:', error);
        res.status(500).json({ error: 'Failed to fetch bulk order' });
    }
};

const getAllBulkOrder = async (req, res) => {
    try {
        const order = await bulkOrderModel.findAll();
        if (!order) {
            return res.status(404).json({ error: 'Bulk orders not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        console.error('Error fetching bulk order:', error);
        res.status(500).json({ error: 'Failed to fetch bulk order' });
    }
};

const ActionsOnBulkOrder = async (req, res) => {
    const { id } = req.params;
    const { action } = req.body;
    try {
        let newStatus;
        if (action === 'accept') {
            newStatus = 'accepted';
        } else if (action === 'reject') {
            newStatus = 'rejected';
        } else {
            return res.status(400).json({ error: 'Invalid action. Use "accept" or "reject".' });
        }

        const [updated] = await bulkOrderModel.update(
            { adminStatus: newStatus },
            { where: { BulkOrderId:id } }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Bulk order not found' });
        }

        const order = await bulkOrderModel.findByPk(id); // Fetch the updated order
        res.status(200).json({ message: `Order ${newStatus}`, order });
    } catch (error) {
        console.error('Error updating bulk order:', error);
        res.status(500).json({ error: 'Failed to update bulk order' });
    }
};

module.exports={createBulkOrder,getBulkOrderById,getAllBulkOrder,ActionsOnBulkOrder};