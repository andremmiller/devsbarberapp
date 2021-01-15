import React, {useState, useEffect} from 'react'
import {Text} from 'react-native'

import {useNavigation, useRoute} from '@react-navigation/native'

import {
    Container,
    Scroller,
    FakeSwiper,
    PageBody,
    BarberInfoArea,
    ServicesArea,
    TestimonialsArea,
    SwipeDot,
    SwipeActiveDot,
    SwipeItem, 
    SwipeImage,
    BarberAvatar,
    BarberInfo,
    BarberName,
    BarberFavButton,
    BackButton,
    LoadingIcon,
    ServicesTitle,
    ServiceItem,
    ServiceInfo,
    ServiceName,
    ServicePrice,
    ServiceChooseButton,
    ServiceChooseButtonText,
    TestimonialItem,
    TestimonialInfo,
    TestimonialName,
    TestimonialBody
} from './styles'

import Stars from '../../components/Stars'
import BarberServiceModal from '../../components/BarberServiceModal'

import Api from '../../Api'
import Swiper from 'react-native-swiper'

import FavouriteIcon from '../../assets/favorite.svg'
import FavouriteFullIcon from '../../assets/favorite_full.svg'
import BackIcon from '../../assets/back.svg'
import NavPrevIcon from '../../assets/nav_prev.svg'
import NavNextIcon from '../../assets/nav_next.svg'

export default () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [loading, setLoading] = useState(false)
    const [favourited, setFavourited] = useState(false)
    const [selectedService, setSelectedService] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [barberInfo, setBarberInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    })

    useEffect(() => {
        const getBarbetExtraInfo = async () => {
            setLoading(true)
            let res = await Api.getBarber(barberInfo.id)
            
            if(res.error == '') {
                setBarberInfo(res.data)
                setFavourited(res.data.favourited)
            } else {
                alert('Erro'+res.error)
            }
            setLoading(false)
        }
        getBarbetExtraInfo()
    }, [])

    const handleFavClick = async () => {
        let res = await Api.setFavourite(barberInfo.id)

        if(res.error == '') {
            setFavourited(res.have)
        } else {
            alert(res.error)
        }
        // setFavourited(!favourited)
    }

    const handleBackButton = () => {
        navigation.goBack()
    }

    const handleServiceChoose = (key) => {
        setSelectedService(key)
        setShowModal(true)
    }

    const truncate = (str, n) => {
        return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    }

    return (
        <Container>
            <Scroller>
                {barberInfo.photos && barberInfo.photos.length > 0 ? 
                    <Swiper
                        style={{height: 240}}
                        dot={<SwipeDot />}
                        activeDot={<SwipeActiveDot />}
                        paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                        autoplay={true}
                    >
                        {barberInfo.photos.map((photo, key) => (
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri: photo.url}} resizeMode="cover" />
                            </SwipeItem>
                        ))}
                    </Swiper>
                    :
                    <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                    <BarberInfoArea>
                        <BarberAvatar source={{ uri: barberInfo.avatar }} />
                        <BarberInfo>
                            <BarberName>{barberInfo.name}</BarberName>
                            <Stars stars={barberInfo.stars} showNumber={true} />
                        </BarberInfo>
                        <BarberFavButton onPress={handleFavClick}>
                            {favourited ? 
                                <FavouriteFullIcon width="24" height="24" fill="#FF0000" />
                                : <FavouriteIcon width="24" height="24" fill="#FF0000" />
                            }
                        </BarberFavButton>
                    </BarberInfoArea>

                    {loading && 
                        <LoadingIcon size="large" color="#000" />
                    }

                    {barberInfo.services && 
                        <ServicesArea>
                            <ServicesTitle>Lista de Serviços</ServicesTitle>

                            {barberInfo.services.map((service, key) => (
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName>{service.name} - {service.id}</ServiceName>
                                        <ServicePrice>{service.price.toFixed(2)}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
                                        <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))}
                        </ServicesArea>
                    }
                    {barberInfo.testimonials && barberInfo.testimonials.length > 0 &&
                        <TestimonialsArea>
                            <Swiper
                                style={{height: 110}}
                                showsPagination={false}
                                showsButtons={true}
                                prevButton={<NavPrevIcon width="35" height="35" fill="#000" />}
                                nextButton={<NavNextIcon width="35" height="35" fill="#000" />}
                            >
                                {barberInfo.testimonials.map((testimonial, key) => (
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{testimonial.name}</TestimonialName>
                                            <Stars stars={testimonial.rate} showNumber={false} />
                                        </TestimonialInfo>
                                        <TestimonialBody>{truncate(testimonial.body, 100)}</TestimonialBody>
                                    </TestimonialItem>
                                ))}
                            </Swiper>
                        </TestimonialsArea>
                    }
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFF" />
            </BackButton>

            <BarberServiceModal 
                show={showModal}
                setShow={setShowModal}
                barberInfo={barberInfo}
                service={selectedService}
            />
        </Container>
    )
}
