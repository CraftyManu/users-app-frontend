import { useEffect, useMemo, useState } from "react";
import type { User } from "@/api/types";
import styles from "./GoogleMap.module.css";

interface GoogleMapProps {
  user: User;
}

function GoogleMap({ user }: GoogleMapProps) {
  const hasAddress = Boolean(user.direccion && user.localidad && user.provincia && user.pais);

  const address = useMemo(() => [user.direccion, user.localidad, user.provincia, user.pais].filter(Boolean).join(", "), [user]);

  const [hasLocation, setHasLocation] = useState<boolean | null>(null);

  useEffect(() => {
    if (!hasAddress) {
      setHasLocation(false);
      return;
    }

    async function findLocation() {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);

        const results = await response.json();

        setHasLocation(results.length > 0);
      } catch (error) {
        console.error(error);
        setHasLocation(false);
      }
    }

    findLocation();
  }, [address, hasAddress]);

  if (!hasAddress) {
    return <p className={styles.noLocation}>Este usuario no tiene dirección.</p>;
  }

  if (hasLocation === null) {
    return <p className={styles.loading}>Buscando dirección...</p>;
  }

  if (!hasLocation) {
    return <p className={styles.noLocation}>No se encontró la dirección.</p>;
  }

  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section className={styles.mapSection}>
      <h3 className={styles.mapTitle}>Ubicación</h3>

      <iframe className={styles.map} src={mapUrl} title={`Map of ${address}`} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
    </section>
  );
}

export default GoogleMap;
