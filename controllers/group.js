import Group from "../Models/group";

const createGroup = async (req, res) => {
    try {
        const { name } = req.body;
        const group = new Group({ name });
        await group.save();
        res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updatedGroup = await Group.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedGroup) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.status(200).json({ message: 'Group updated successfully', updatedGroup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedGroup = await Group.findByIdAndDelete(id);

        if (!deletedGroup) {
            return res.status(404).json({ error: 'Group not found' });
        }

        res.status(200).json({ message: 'Group deleted successfully', deletedGroup });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { createGroup, updateGroup, deleteGroup };
