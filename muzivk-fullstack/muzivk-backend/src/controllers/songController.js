import { v2 as cloudinary } from 'cloudinary';
import songModel from '../models/songModel.js';
import albumModel from '../models/albumModel.js';

const addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;

        // Tek dosya alınıyor, array değil
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        
        // Audio ve image yüklemesi
        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        
        // Şarkının süresini hesapla
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;

        // Albümün var olup olmadığını kontrol edin
        const albumExists = await albumModel.findById(album);
        if (!albumExists) {
            return res.json({ success: false, message: "Albüm bulunamadı" });
        }

        // Şarkı verilerini oluştur
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        };

        // Şarkıyı kaydet
        const song = new songModel(songData);
        await song.save();
        
        res.json({ success: true, message: "Şarkı Eklendi" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Bir hata oluştu." });
    }
};

const listSong = async (req, res) => {
    try {
        const allSongs = await songModel.find({}).populate('album'); // Albüm bilgilerini ekleyin
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Bir hata oluştu." });
    }
};

const removeSong = async (req, res) => {
    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Şarkı Kaldırıldı" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Bir hata oluştu." });
    }
};

export { addSong, listSong, removeSong };
