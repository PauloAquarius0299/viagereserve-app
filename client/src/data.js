import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import {
  FaSkiing,
  FaPumpSoap,
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
  FaKey,
} from "react-icons/fa";
import { FaHouseUser, FaPeopleRoof, FaKitchenSet } from "react-icons/fa6";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
  BiWorld,
} from "react-icons/bi";
import { BsSnow, BsFillDoorOpenFill, BsPersonWorkspace } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla, MdMicrowave, MdBalcony, MdYard, MdPets } from "react-icons/md";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import { TbIroning3 } from "react-icons/tb";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiBarbecue,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import praia from './assets/beach-house.jpg'
import vento from "./assets/vento.jpg"
import modern from "./assets/moderna.jpg"
import interior from "./assets/interior.jpg"
import pool from "./assets/pool.jpg"
import ilha from "./assets/ilha.jpg"


export const categories = [
  {
    label: "All",
    icon: <BiWorld />,
  },
  {
    img: praia,
    label: "Praia",
    icon: <TbBeach />,
    description: "Essa propriedade fica proximo da praia!",
  },
  {
    img: vento,
    label: "Ventos",
    icon: <GiWindmill />,
    description: "Essa propriedade venta muito!",
  },
  {
    img: modern,
    label: "Moderna",
    icon: <MdOutlineVilla />,
    description: "Essa propriedade possui uma arquitetura moderna!",
  },
  {
    img: interior,
    label: "Interior",
    icon: <TbMountain />,
    description: "Essa propriedade fica no interior!",
  },
  {
    img: pool,
    label: "Piscina",
    icon: <TbPool />,
    description: "Essa propriedade possui piscina!",
  },
  {
    img: ilha,
    label: "Ilha",
    icon: <GiIsland />,
    description: "Essa propriedade fica em uma ilha isolada!",
  },
  {
    img: "assets/lake_cat.webp",
    label: "Lago",
    icon: <GiBoatFishing />,
    description: "Essa propriedade fica proximo ao lago!",
  },
  {
    img: "assets/skiing_cat.jpg",
    label: "Skiar",
    icon: <FaSkiing />,
    description: "Essa propriedade tem atividades como skiar!",
  },
  {
    img: "assets/castle_cat.webp",
    label: "Castelos",
    icon: <GiCastle />,
    description: "Essa propriedade tem castelos!",
  },
  {
    img: "assets/cave_cat.jpg",
    label: "Cavernas",
    icon: <GiCaveEntrance />,
    description: "Essa propriedade tem cavernas!",
  },
  {
    img: "assets/camping_cat.jpg",
    label: "Acampar",
    icon: <GiForestCamp />,
    description: "Essa propriedade tem atividades de acampamento!",
  },
  {
    img: "assets/arctic_cat.webp",
    label: "Frio",
    icon: <BsSnow />,
    description: "Essa propriedade fica em lugar frio!",
  },
  {
    img: "assets/desert_cat.webp",
    label: "Deserto",
    icon: <GiCactus />,
    description: "Essa propriedade fica proximo de um deserto!",
  },
  {
    img: "assets/barn_cat.jpg",
    label: "Fazenda",
    icon: <GiBarn />,
    description: "Essa propriedade é uma fazenda!",
  },
  {
    img: "assets/lux_cat.jpg",
    label: "Luxo",
    icon: <IoDiamond />,
    description: "Essa propriedade tem arquitetura luxuosa!",
  },
];

export const types = [
  {
    name: "Um lugar inteiro ",
    description: "Os hóspedes têm o espaço todo só para eles",
    icon: <FaHouseUser />,
  },
  {
    name: "Quartos proprios",
    description:
      "Os hóspedes têm seu próprio quarto em uma casa, além de acesso a lugares compartilhados  ",
    icon: <BsFillDoorOpenFill />,
  },
  {
    name: "Um quarto compartilhado",
    description:
      "Os hóspedes dormem em um quarto ou área comum que pode ser compartilhada com você ou outras pessoas",
    icon: <FaPeopleRoof />,
  },
];

export const facilities = [
  {
    name: "Bannheira",
    icon: <PiBathtubFill />,
  },
  {
    name: "Cuidados Pessoais",
    icon: <FaPumpSoap />,
  },
  {
    name: "Chuveiro",
    icon: <FaShower />,
  },
  {
    name: "Maquina de Lavar",
    icon: <BiSolidWasher />,
  },
  {
    name: "Secadora",
    icon: <BiSolidDryer />,
  },
  {
    name: "Cabides",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "Fero",
    icon: <TbIroning3 />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Area de Trabalho",
    icon: <BsPersonWorkspace />
  },
  {
    name: "Ar Condicionado",
    icon: <BsSnow />,
  },
  {
    name: "Aquecedor",
    icon: <GiHeatHaze />,
  },
  {
    name: "Cameras de Segurança",
    icon: <GiCctvCamera />,
  },
  {
    name: "Extintor",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "Primeiros Socorros",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },
  {
    name: "Conjunto de cozinha",
    icon: <FaKitchenSet />,
  },
  {
    name: "Refrigerador",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microondas",
    icon: <MdMicrowave />,
  },
  {
    name: "Forno",
    icon: <GiToaster />,
  },
  {
    name: "Churrasqueira",
    icon: <GiBarbecue />,
  },
  {
    name: "Area de Jantar",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Varanda",
    icon: <MdBalcony />,
  },
  {
    name: "Area de Fogueira",
    icon: <GiCampfire />,
  },
  {
    name: "Jardim",
    icon: <MdYard />,
  },
  {
    name: "Estacionamento",
    icon: <AiFillCar />,
  },
  {
    name: "Check-in automático",
    icon: <FaKey />
  },
  {
    name: "Area para Pets",
    icon: <MdPets />
  }
];