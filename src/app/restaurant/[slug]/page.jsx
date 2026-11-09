import { notFound } from "next/navigation";
import MenuItem from '@/components/MenuItem/MenuItem'
import data from "@/data/restaurants.json";
import styles from "../page.module.css";
import { LikeButton } from "@/components/RestaurantCard/RestaurantCard";

export default async function RestaurantPage({ params }) {
  const { slug } = await params;
  const restaurant = data.restaurants.find((item) => item.slug === slug);

  // Affiche la page 404 du segment si le slug ne correspond à aucun restaurant.
  if (!restaurant) {
    notFound();
  }

  const categoryImages = {
    "entrées": "/images/entrees.png",
    plats: "/images/plats.png",
    desserts: "/images/desserts.png",
  };

  return (
    <main className={styles["restaurant-menu"]}>
      {/*Récupération des images des catégories depuis le fichier JSON et affichage de l'image correspondante à chaque catégorie*/}
        <img src={restaurant.image} alt={restaurant.name} className={styles["restaurant-image"]} />
      <section className={styles["restaurant-content"]}>
                          
          {/*Container avec nom du restaurant et bouton like*/}  
          <div className={styles["restaurant-title"]}>

            {/*Récupération du nom du restaurant depuis le fichier JSON et affichage du nom dans un élément h1*/}
              <h1 className={styles["restaurant-name"]}>{restaurant.name}</h1>

           {/*Ajout du bouton "like" à côté du nom du restaurant*/}
              <LikeButton className={styles["like-button"]}/>
              
          </div>
        
        {/*Récupération des catégories de menu (entrées/plats/desserts) depuis le fichier JSON et affichage de chaque catégorie avec ses items correspondants (nom des plats et détails)*/}
        {Object.entries(restaurant.menu).map(([category, items]) => (
          <div className={styles["menu-category"]} key={category}>
            <img className={styles["menu-category-image"]} src={categoryImages[category]} alt={category} />
            <div className={styles["menu-items"]}>
              {items.map((item, index) => (
                <MenuItem key={item.nom} item={item} index={index} />
              ))}
            </div>
          </div>
        ))}
        <button className={styles["commander-button"]}>
          <img src="/images/button-commander.png" alt="Commander" />
        </button>
      </section>
    </main>
        );
}