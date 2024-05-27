import db from "../config/db.js";

const populateDatabase = async () => {
    try {

        const productCount = await db.models.product.count();

        if (productCount === 0) {
            const initialProducts = [
                { name: 'YVES SAINT LAURENT Sweatshirt YSL Logo', price: 239, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532671/ecomm-server/ysl_sweat_dzcu3i.avif" },
                { name: 'ALEXANDER MCQUEEN Sweatshirt MCQ Logo', price: 279, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532672/ecomm-server/mcqueen_sweat_b8yvym.avif" },
                { name: 'KENZO Sweatshirt Tiger Logo', price: 180, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532673/ecomm-server/kenzo_sweat_eqogb1.avif" },
                { name: 'VIVIENNE WESTWOOD Black Hoodie', price: 315, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532672/ecomm-server/westwood_hoodie_emzcop.avif" },
                { name: 'RALPH LAUREN POLO Sweatshirt', price: 120, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532671/ecomm-server/polo_sweat_y5rgbb.avif" },
                { name: 'BURBERRY Trainers', price: 445, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532673/ecomm-server/burberry_trainers_buug9d.avif" },
                { name: 'OFF-WHITE VULC Trainers', price: 229, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532672/ecomm-server/off-white_vulc_hzq613.avif" },
                { name: 'BALENCIAGA TRACK Trainers', price: 799, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532674/ecomm-server/balenciaga_track_s0cnuw.avif" },
                { name: 'LOUBOUTIN Trainers', price: 725, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532672/ecomm-server/louboutin_lzpduq.avif" },
                { name: 'GUCCI NEW ACE Trainers', price: 545, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532674/ecomm-server/gucci_new_ace_mhev5h.jpg" },
                { name: 'BALENCIAGA SPEED SOCK Trainers', price: 650, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532674/ecomm-server/balenciaga_speed_sock_z6rwf5.avif" },
                { name: 'VALENTINO ROCKSTUD Trainers', price: 395, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532672/ecomm-server/valentino-rockstud_lbl7jx.avif" },
                { name: 'OFF-WHITE OOO Trainers', price: 530, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532672/ecomm-server/off-white_ooo_rmrxoc.avif" },
                { name: 'AMIRI SKELETON Trainers', price: 560, stock: 10, picture: "https://res.cloudinary.com/dqvazcqdl/image/upload/v1716532674/ecomm-server/amiri_skeleton_ntrvrw.avif" },
            ];
            await db.models.product.bulkCreate(initialProducts);
            console.log('Database has been populated with initial products.');
        } else {
            console.log('Database already has products. Skipping population.');
        }
    } catch (error) {
        console.error('Error populating database:', error);
    }
};


export default populateDatabase;

