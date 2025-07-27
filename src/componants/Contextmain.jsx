import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Prayer from './Prayer';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import "moment/dist/locale/ar-dz"
moment.locale("ar");
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
export default function Contextmain() {
    const [contary, setcontary] = useState({ displaycity: "وهران", apicity: "Oran" });
    const [timing, settiming] = useState({
    });
    const [day, setday] = useState("");
    const [nextprayer, setnextprayer] = useState(0);
    const [remainingtimesate, setremainingtimesate] = useState("");
    const prayers = [
        { key: "Fajr", displayname: "الفجر" },
        { key: "Dhuhr", displayname: "الظهر" },
        { key: "Asr", displayname: "العصر" },
        { key: "Sunset", displayname: "المغرب" },
        { key: "Isha", displayname: "العشاء" },
    ]
    const [sizeofweb, setsizeofweb] = useState(0);
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
    const NestHub = useMediaQuery({ minWidth: 1024, minHeight: 600 });
    const NestHubmax = useMediaQuery({ minWidth: 1280, minHeight: 800 });
    const isDesktop = useMediaQuery({ minWidth: 1281 });

    useEffect(() => {
        if (isDesktop) {
            setsizeofweb(0);
        }
        else if (NestHub) {
            setsizeofweb(110)
        } else if (NestHubmax) {
            setsizeofweb(90)
        } else if (isTablet) {
            setsizeofweb(90)
        }
        else if (isMobile) {

            setsizeofweb(210);
        }
    }, [isMobile, NestHub, NestHubmax, isTablet, isDesktop])


    const getdata = async () => {
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${contary.apicity}&country=Algeria`);
        settiming(response.data.data.timings)
    }
    const setupcountdowntimer = () => {
        let nextprayerinex = 0;
        const momentNow = moment();
        if (momentNow.isAfter(moment(timing["Fajr"], "hh:mm")) && momentNow.isBefore(moment(timing["Dhuhr"], "hh:mm"))) {
            nextprayerinex = 1;
        } else if (momentNow.isAfter(moment(timing["Dhuhr"], "hh:mm")) && momentNow.isBefore(moment(timing["Asr"], "hh:mm"))) {
            nextprayerinex = 2;
        } else if (momentNow.isAfter(moment(timing["Asr"], "hh:mm")) && momentNow.isBefore(moment(timing["Maghrib"], "hh:mm"))) {
            nextprayerinex = 3;
        } else if (momentNow.isAfter(moment(timing["Maghrib"], "hh:mm")) && momentNow.isBefore(moment(timing["Isha"], "hh:mm"))) {
            nextprayerinex = 4;
        } else {
            nextprayerinex = 0;
        }
        setnextprayer(nextprayerinex);
        const nextprayerobj = prayers[nextprayerinex];
        const nextprayertime = timing[nextprayerobj.key];
        const nextprayertimemoment = moment(nextprayertime, "hh:mm");
        let remainingtime = moment(nextprayertime, "hh:mm").diff(momentNow);
        if (remainingtime < 0) {
            const tomdn = moment("23:59:59", "hh:mm:ss").diff(momentNow);
            const fjrtomdn = nextprayertimemoment.diff(moment("00:00:00", "hh:mm:ss"));
            const totaldif = tomdn + fjrtomdn;
            remainingtime = totaldif;
        }
        const dure = moment.duration(remainingtime);
        setremainingtimesate(`${dure.hours()}:${dure.minutes()}:${dure.seconds()}`);

    }
    useEffect(() => {
        getdata();
    }, [contary]);
    useEffect(() => {
        let intarval = setInterval(() => {
            setday(moment().format('MMMM Do YYYY | h:mm'));
            setupcountdowntimer();
        }, 1000)
        return () => {
            clearInterval(intarval)
        }
    }, [timing]);
    const Listofcity = [
        { displaycity: "01- أدرار", apicity: "Adrar" },
        { displaycity: "02- الشلف", apicity: "Chlef" },
        { displaycity: "03- الأغواط", apicity: "Laghouat" },
        { displaycity: "04- م البواقي", apicity: "Oum%20El%20Bouaghi" },
        { displaycity: "05- باتنة", apicity: "Batna" },
        { displaycity: "06- بجاية", apicity: "Bejaia" },
        { displaycity: "07- بسكرة", apicity: "Biskra" },
        { displaycity: "08- بشار", apicity: "Bechar" },
        { displaycity: "09- البليدة", apicity: "Blida" },
        { displaycity: "10- البويرة", apicity: "Bouira" },
        { displaycity: "11- تمنراست", apicity: "Tamanrasset" },
        { displaycity: "12- تبسة", apicity: "Tebessa" },
        { displaycity: "13- تلمسان", apicity: "Tlemcen" },
        { displaycity: "14- تيارت ", apicity: "Tiaret" },
        { displaycity: "15- تيزي وزو", apicity: "Tizi%20Ouzou&country" },
        { displaycity: "16- الجزائرالعاصمة", apicity: "Algiers" },
        { displaycity: "17- الجلفة", apicity: "Djelfa" },
        { displaycity: "18- جيجل", apicity: "Jijel" },
        { displaycity: "19- سطيف", apicity: "Setif" },
        { displaycity: "20- سعيدة", apicity: "Saida" },
        { displaycity: "21- سكيكدة", apicity: "Skikda" },
        { displaycity: "22- سيدي بلعباس", apicity: "Sidi%20Bel%20Abbes" },
        { displaycity: "23- عنابة", apicity: "Annaba" },
        { displaycity: "24- قالمة", apicity: "Guelma" },
        { displaycity: "25- قسنطينة", apicity: "Constantine" },
        { displaycity: "26- المدية", apicity: "Medea" },
        { displaycity: "27- مستغانم", apicity: "Mostaganem" },
        { displaycity: "28- المسيلة", apicity: "MSila" },
        { displaycity: "29- معسكر", apicity: "Mascara" },
        { displaycity: "30- ورقلة", apicity: "Ouargla" },
        { displaycity: "31- وهران", apicity: "Oran" },
        { displaycity: "32- البيض", apicity: "El%20Bayadh" },
        { displaycity: "33- إليزي", apicity: "Illizi" },
        { displaycity: "34- برج بوعريريج", apicity: "Bordj" },
        { displaycity: "35- بومرداس", apicity: "Boumerdes" },
        { displaycity: "36- الطارف", apicity: "El%20Tarf" },
        { displaycity: "37- تندوف", apicity: "Tindouf" },
        { displaycity: "38- تيسمسيلت", apicity: "Tissemsilt" },
        { displaycity: "39- الوادي", apicity: "El%20Oued" },
        { displaycity: "40- خنشلة", apicity: "Khenchela" },
        { displaycity: "41- سوق أهراس", apicity: "Souk%20Ahras" },
        { displaycity: "42- تيبازة", apicity: "Tipaza" },
        { displaycity: "43- ميلة", apicity: "Mila" },
        { displaycity: "44- عين الدفلى", apicity: "Ain%20Defla" },
        { displaycity: "45- النعامة", apicity: "Naama" },
        { displaycity: "46- عين تموشنت", apicity: "Ain%20Temouchent" },
        { displaycity: "47- غرداية", apicity: "Ghardaia" },
        { displaycity: "48- غليزان", apicity: "Relizane" },
        { displaycity: "49- تيميمون", apicity: "Timimoun" },
        { displaycity: "50- برج باجي المختار", apicity: "Bordj%20Badji%20Mokhtar" },
        { displaycity: "51- ولاد جلال", apicity: "Ouled%20Djellal" },
        { displaycity: "52- بني عباس", apicity: "Beni%20Abbes" },
        { displaycity: "53- عين صالح", apicity: "In%20Salah" },
        { displaycity: "54- عين قزّام", apicity: "In%20Guezzam" },
        { displaycity: "55- تقرت", apicity: "Touggourt" },
        { displaycity: "56- جانت", apicity: "Djanet" },
        { displaycity: "57- المغير", apicity: "El%20M'Ghair" },
        { displaycity: "58- المنيعة", apicity: "El%20Menia" },


    ]
    const handelchanche = (e) => {
        const city = Listofcity.find((c) => {
            return c.apicity == e.target.value;
        });
        setcontary(city)
    };
    return (
        <div >
            <Grid container spacing={6} marginTop={sizeofweb} >
                <Grid size={6} >
                    <div >
                        <h1>{contary.displaycity}</h1>
                        <h2 style={{ fontSize: "30px" }}>{day}</h2>
                    </div>
                </Grid>
                <Grid size={6} >
                    <div >
                        <h1>متبقي حتى صلاه {prayers[nextprayer].displayname} </h1>
                        <h2 style={{ fontSize: "30px" }}>{remainingtimesate}</h2></div>
                </Grid>
            </Grid>
            <Divider style={{ borderColor: "white", opacity: "0.2" }} />
            <Stack
                alignItems={'center'}
                justifyContent={"center"}
                spacing={6}
                direction="row"
                useFlexGap
                sx={{ flexWrap: 'wrap' }}
                style={{ marginTop: "60px" }}
            >
                <Prayer img="https://al-imen.com/cdn/shop/articles/salat-al-fajr-pour-debuter-votre-journee-avec-spiritualite-120995.png?v=1744211536" salat="الفجر" time={timing.Fajr} />
                <Prayer img="https://al-imen.com/cdn/shop/articles/salat-doha-le-secret-matinal-pour-recharger-votre-spiritualite-quotidienne-568421.png?v=1744211531" salat="الظهر" time={timing.Dhuhr} />
                <Prayer img="https://al-imen.com/cdn/shop/articles/salat-asr-votre-guide-complet-pour-cultiver-la-paix-interieure-874820.png?v=1744211542" salat="العصر" time={timing.Asr} />
                <Prayer img="https://al-imen.com/cdn/shop/articles/salat-al-fajr-pour-debuter-votre-journee-avec-spiritualite-120995.png?v=1744211536" salat="المغرب " time={timing.Maghrib} />
                <Prayer img="https://al-imen.com/cdn/shop/articles/salat-icha-pour-cloturer-votre-journee-803487.png?v=1744211526" salat="العشاء" time={timing.Isha} />
            </Stack>
            <Stack justifyContent={'center'} alignItems={'center'} style={{ marginTop: "70px", marginBottom: "10px" }}>
                <FormControl sx={{ width: "30%" }}>
                    <InputLabel id="demo-simple-select-label" style={{ color: "white" }} >المدينة</InputLabel>
                    <Select
                        value={contary.apicity}
                        style={{ color: "white" }}
                        onChange={handelchanche}
                        MenuProps={MenuProps}
                    >
                        {Listofcity.map((e) => {
                            return (
                                <MenuItem value={e.apicity}>{e.displaycity}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Stack>
            <img src='/public/img/Dhuhr.png' />
        </div >
    );
}