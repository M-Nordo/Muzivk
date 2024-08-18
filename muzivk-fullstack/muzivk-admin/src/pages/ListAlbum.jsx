import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
    const [data, setData] = useState([]);

    // Albümleri getiren fonksiyon
    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);
            if (response.data.success) {
                setData(response.data.albums || []);
            } else {
                toast.error('Albümler alınamadı');
            }
        } catch (error) {
            toast.error('Albümler yüklenirken bir hata oluştu');
        }
    };

    // Albümü kaldırma fonksiyonu
    const removeAlbum = async (id) => {
        try {
            const response = await axios.post(`${url}/api/album/remove`, { id });
            if (response.data.success) {
                toast.success('Albüm kaldırıldı');
                // Albümleri yeniden getir
                fetchAlbums();
            } else {
                toast.error('Albüm kaldırılırken bir hata oluştu');
            }
        } catch (error) {
            toast.error('Albüm kaldırılırken bir hata oluştu');
        }
    };

    useEffect(() => {
        fetchAlbums();
    }, []);

    return (
        <div>
            <p>Tüm Albümler</p>
            <br />
            <div>
                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Görsel</b>
                    <b>İsim</b>
                    <b>Açıklama</b>
                    <b>Albüm Rengi</b>
                    <b>Durum</b>
                </div>
                {data.length > 0 ? data.map((item) => (
                    <div key={item._id} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                        <img className='w-12' src={item.image} alt={`${item.name} Albüm Görseli`} />
                        <p>{item.name}</p>
                        <p>{item.desc}</p>
                        <input type="color" value={item.bgColour} readOnly />
                        <p
                            className='cursor-pointer text-red-600 hover:text-red-800'
                            onClick={() => removeAlbum(item._id)}
                        >
                            x
                        </p>
                    </div>
                )) : <p>Albümler bulunamadı</p>}
            </div>
        </div>
    );
};

export default ListAlbum;
