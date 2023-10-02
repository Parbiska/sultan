import s from './Footer.module.scss'
import logo from '../../img/footer/logo_white.svg'
import arrowRight from '../../img/icons/arrow-right.svg'
import download from '../../img/icons/download.svg'
import telegram from '../../img/footer/telegram.svg'
import whatsapp from '../../img/footer/whatsapp.svg'
import visa from '../../img/footer/visa.svg'
import mastercard from '../../img/footer/mastercard.svg'

const Footer = () => {
	return (
		<footer className={s.footer}>
			<div className={'container ' + s.footer__content}>
				<div className={s.footer__info}>
					<div className={s.footer__info__logo}>
						<img src={logo} alt="logo" />
					</div>
					<div className={s.footer__info__text}>
						Компания «Султан» — снабжаем розничные магазины товарами
						"под ключ" в Кокчетаве и Акмолинской области
					</div>

					<div className={s.footer__info__promotion}>
						Подпишись на скидки и акции
						<form className={s.footer__info__form}>
							<input
								placeholder="Введите ваш E-mail"
								className={s.footer__info__input}
								type="email"
							/>
							<button className={s.footer__info__button}>
								<img src={arrowRight} alt="send" />
							</button>
						</form>
					</div>
				</div>

				<div className={s.footer__wrapper}>
					<div className={s.footer__element}>
						<div className={s.footer__element__title}>
							Меню сайта:
						</div>
						<ul className={s.footer__element__list}>
							<li className={s.footer__element__text}>
								<a href="/">О компании</a>
							</li>
							<li className={s.footer__element__text}>
								<a href="/">Доставка и оплата</a>
							</li>
							<li className={s.footer__element__text}>
								<a href="/">Возврат</a>
							</li>
							<li className={s.footer__element__text}>
								<a href="/">Контакты</a>
							</li>
						</ul>
					</div>

					<div className={s.footer__element}>
						<div className={s.footer__element__title}>
							Категории:
						</div>
						<ul className={s.footer__element__list}>
							<li className={s.footer__element__text}>
								<a href="/">Бытовая химия</a>
							</li>
							<li className={s.footer__element__text}>
								<a href="/">Косметика и гигиена</a>
							</li>
							<li className={s.footer__element__text}>
								<a href="/">Товары для дома</a>
							</li>
							<li className={s.footer__element__text}>
								<a href="/">Товары для детей и мам</a>
							</li>
							<li className={s.footer__element__text}>
								<a href="/">Посуда</a>
							</li>
						</ul>
					</div>

					<div className={s.footer__element}>
						<div className={s.footer__element__title}>
							Скачать прайс-лист:
						</div>

						<button className={s.footer__price__button}>
							Прайс-лист
							<img src={download} alt="download" />
						</button>

						<div className={s.footer__element__text}>
							Связь в мессенджерах:
						</div>

						<div className={s.footer__price__socials}>
							<div className={s.footer__price__social}>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://www.whatsapp.com"
								>
									<img src={whatsapp} alt="whatsapp" />
								</a>
							</div>
							<div className={s.footer__price__social}>
								<a
									target="_blank"
									rel="noreferrer"
									href="https://telegram.org"
								>
									<img src={telegram} alt="telegram" />
								</a>
							</div>
						</div>
					</div>

					<div className={s.footer__element}>
						<div className={s.footer__element__title}>
							Контакты:
						</div>

						<div className={s.footer__contact__phone}>
							<span>+7 (777) 490-00-91</span>
							время работы: 9:00-20:00
							<a href="/">Заказать звонок</a>
						</div>

						<div className={s.footer__contact__email}>
							<span>opt.sultan@mail.ru </span>
							На связи в любое время
						</div>

						<div className={s.footer__contact__payment}>
							<div className={s.footer__contact__visa}>
								<img src={visa} alt="visa" />
							</div>

							<div className={s.footer__contact__mastercard}>
								<img src={mastercard} alt="mastercard" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
