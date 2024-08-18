import { v2 as cloudinary } from 'cloudinary';
import albumModel from '../models/albumModel.js';

const addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColour } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.json({ success: false, message: 'Görsel dosyası bulunamadı' });
        }

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });

        const albumData = {
            name,
            desc,
            bgColour,
            image: imageUpload.secure_url
        };

        const album = new albumModel(albumData);
        await album.save();

        res.json({ success: true, message: "Albüm Eklendi" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Albüm eklenirken bir hata oluştu' });
    }
}

const listAlbum = async (req, res) => {
    try {
        const allAlbums = await albumModel.find({});
        res.json({success:true, albums: allAlbums});
    } catch (error) {
        res.json({success:false});
    }
};


const removeAlbum = async (req, res) => {
    try {
        await albumModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Albüm Kaldırıldı" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'Albüm silinirken bir hata oluştu' });
    }
}

export { addAlbum, listAlbum, removeAlbum };