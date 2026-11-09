
"use client";
import data from "@/data/restaurants.json";
import { useState } from "react";
import styles from "./RestaurantCard.module.css";
import Link from "next/link";

/* Bouton like */
export function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button
      type="button"
      className={styles["like-button"]}
      onClick={() => setLiked(!liked)}
      aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
    >
      <img
      className={styles["like-icon"]}
       src={liked ? "/images/status-liked.png" : "/images/like.png"}
      alt=""
      />
    </button>
  );
}

export default function RestaurantCard({className}) {
    const restaurants = data.restaurants;

       return (
        <div className={className}>
            {restaurants.map((restaurant) => (
                <div key={restaurant.id} className={styles["restaurant-id"]}>

                  {/*Lien cliquable de l'image vers la page du restaurant */}
                    <Link href={`/restaurant/${restaurant.slug}`}>

                      <img src={restaurant.image} alt={restaurant.name} className={styles["restaurant-image"]}/>
                    </Link>

                        {/*Conteneur commun pour le nom, la localisation et le bouton "like"*/}
                      <div className={styles["restaurant-title"]}>
                        
                  {/*Lien cliquable du nom du restaurant ou de sa localisation vers la page du restaurant */}
                    <Link href={`/restaurant/${restaurant.slug}`}>

                        {/*conteneur pour le nom et le lieu*/}
                          <div className={styles["restaurant-name-location"]}>
                            <h3 className={styles["restaurant-name"]}>{restaurant.name}</h3>
                            <p className={styles["restaurant-location"]}>{restaurant.location}</p>
                          </div>
                    </Link>
                    <LikeButton />
                      </div>

                      {/*Insertion du "Nouveau" vert sur l'image du restaurant */}
                 <img className={styles["nouveau-icon"]} src="images/nouveau.png" alt="Nouveau"/>

                </div>   
            ))} 
                        
        </div>
       );   
}