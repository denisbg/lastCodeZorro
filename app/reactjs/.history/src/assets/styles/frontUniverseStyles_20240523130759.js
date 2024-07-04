import { Col } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { GalerieSlideStyle, GrayColor, GreenColor, OrangeColor, RadioButtonForm, RangePrice } from './componentStyles';
import iconSearch from '../images/icons/icon-search-green.svg';
import { ButtonDefault, InputGroup } from './adminStyle/adminGlobalStyle';
import { SearchIcon, mixinIcon, GPSIcon } from './icons';
import { BlocTopSide, NavMenu, SideNavBar } from './adminStyle/sideNavStyle';
import iconArrowGray from '../images/icons/arrow-gray.svg';
import iconGpsBlanc from '../images/icons/icon-gps-blanc.svg';


export const ProduititemStyle = styled(Col)
	`
  margin-bottom: 30px;
  .content-item-produit {
    background: #ffffff;
    box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
    border-radius: 20px;
    overflow: hidden;
    height: 100%;
    a {
      text-decoration: none;
    }
  }
  .img-produit {
    height: 180px;
    a {
      display: block;
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
  .detail-produit {
    padding: 24px 26px 60px;
    text-align: center;
    position: relative;
    height: calc(100% - 180px);
  }
  .name-produit {
    font-size: 18px;
    line-height: 25px;
    font-weight: 600;
    margin-bottom: 15px;
    a {
      color: #e67c2e;
    }
  }
  .desc-produit {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 22px;
  }
  .cats-prestation {
    display: flex;
    align-items: baseline;
    font-size: 14px;
    margin-bottom: 15px;
    & > span {
      margin-right: 5px;
      white-space: nowrap;
    }
    .item-cats-prestation {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 12px;
      p {
        font-weight: 500;
        color: #fff;
        background-color: ${GreenColor};
        margin-bottom: 5px;
        margin-right: 8px;
        padding: 2px 5px;
        &:last-child {
          margin-right: 0px;
        }
      }
    }
  }
  .disabled-link{
	cursor: default;
  }
  .url-btn-produit {
    position: absolute;
    bottom: 24px;
    left: 26px;
    right: 26px;
    ${ButtonDefault} {
      width: 100%;
      font-size: 15px;
      padding: 6px 20px;
      height: 37px;
      font-weight: 600;
    }
  }
  @media (max-width: 593px) {
    margin-bottom: 20px;
  }
`;

export const CordStyle = styled.div`
    margin-top: 35px;
	font-size: 15px;
	line-height: 22px;
	a {
		color: #fff;
		text-decoration: none;
		transition: 0.4s all;
		&:hover {
			color: #444444;
		}
	}
	.cordtitle {
		margin-top: 35px;
		width: 800px; 
		height: 58px; 
		color: #4C5F68; 
		font-size: 40px; 
		font-family: Helvetica Neue LT Std; 
		font-weight: 700; 
		line-height: 1px; 
		word-wrap: break-word;    
	}
	.url-btn {
        position: absolute;
        bottom: 24px;
       
        ${ButtonDefault} {
          width: 100%;
          font-size: 15px;
          padding: 6px 20px;
          height: 37px;
         
        }
      }
	.title-univers {
		
		margin-top: 5px;
		width: 100%; 
		height: 75px;  
		font-size: 60px; 
		font-weight: 700; 
		font-Family: 'Helvetica Neue LT Std'; 
		color: #4D5F68;
		line-height: 1;
	}
	       
	.home-univers {
		margin-top: 0px;
		width: 1000px; 
		height: 95px;  
		font-size: 20px; 
		font-weight: 500; 
		font-Family: 'Helvetica Neue LT Std'; 
		color: #929292;
		line-height: 1;
		
	}
	.commentcamarche {
		margin-top: 0px;
		width: 1000px; 
		height: 95px;  
		font-size: 20px; 
		font-weight: 500; 
		font-Family: 'Helvetica Neue LT Std'; 
		color: #929292;
		line-height: 1;
		
	}
	.img-univers {
		margin-top: 25px;
		margin-left: -100px;
	}
	.z3imgbottom {
		width: 1290px;
		height: 65; 
		background: rgba(154.33, 220.14, 46.96, 0.20);
	}
   
`;
export const FooterStyle = styled.div`
	background-color: ${GrayColor};
	padding: 50px 0 30px;
	font-size: 15px;
	line-height: 22px;
	a {
		color: #fff;
		text-decoration: none;
		transition: 0.4s all;
		&:hover {
			color: #444444;
		}
	}
	.menu-footer {
		.title-menu-footer {
			font-weight: 600;
			margin-bottom: 15px;
			color: #fff;
			text-transform: uppercase;
		}
		ul {
			list-style: none;
			padding: 0;
			font-weight: 500;
			li {
				margin-bottom: 15px;
			}
		}
	}
	.socials {
		a {
			margin-right: 13px;
			display: inline-block;
			margin-bottom: 8px;
			transition: 0.4s all;
			transform-origin: center;
			&:hover {
				transform: scale(1.2);
			}
		}
	}
	@media (max-width: 1199px) {
		padding: 45px 0 30px;
		text-align: center;
		.container {
			width: 900px;
			& > .row {
				& > div {
					margin-bottom: 30px;
					&:last-child {
						margin-bottom: 0;
					}
				}
			}
		}
	}
	@media (max-width: 767px) {
		.container {
			& > .row {
				& > div {
					& > .row {
						& > div {
							margin-bottom: 35px;
							&:last-child {
								margin-bottom: 5px;
							}
						}
					}
				}
			}
		}
	}
`;
export const ListFichePrestation = styled.div`
	.head-list-content {
		display: flex;
		align-items: flex-end;
		margin-top: -15px;
		margin-bottom: 33px;
		.title-bloc-products {
			font-size: 24px;
			line-height: 33px;
			color: #444444;
			margin: 0;
		}
		.form-group {
			margin-left: auto;
			min-width: 287px;
			margin-bottom: 0px;
			margin-top: -28px;
			& > label {
				white-space: nowrap;
			}
			& > .react-select__container {
				width: 100%;
			}
		}
	}
	.bloc-lists-prstation-items {
		height: 100vh;
		& > div {
			height: 100%;
			padding: 15px 15px 0;
		}
		.bloc-map-list {
			& > div {
				overflow: hidden;
			}
		}
	}
	.content-lists-prstation-items {
		height: 100%;
		overflow-y: scroll;
	}
	.item-map-prestation {
		transition: 0.3s all;
		font-size: 16px !important;
		&.active {
			background-color: ${GreenColor} !important;
			color: #fff !important;
		}
		@media (min-width: 1200px) {
			&:hover {
				background-color: ${GreenColor} !important;
				color: #fff !important;
			}
		}
	}
	@media (max-width: 593px) {
		.head-list-content {
			margin-top: 35px;
			.form-group {
				margin-top: 0;
				label {
					display: none;
				}
			}
		}
		.bloc-lists-prstation-items {
			height: auto;
			position: relative;
			margin: 0 -18px;
			.bloc-map-list {
				height: 350px;
				padding: 15px 0 0;
			}

			.content-lists-prstation-items {
				height: auto;
				overflow-y: initial;
				z-index: 1;
				padding: 10px 0 20px;
				order: 2;
				.loading-table {
					width: 100%;
					display: inline-block;
					position: absolute;
					top: -5px;
					text-align: center;
					font-size: 18px;
					font-weight: 600;
				}
				.slick-track, .slick-list {
					display: flex;
				}
				.slick-slide {
					width: 314px;
					padding: 20px 10px 10px;
					& > div{
						height: 100%;
						& > div{
							height: 100%;
						}
					}
				}
			}
		}
	}
	@media (max-width: 767px) {
		.head-list-content {
			flex-wrap: wrap;
			justify-content: center;
			margin-bottom: 25px;
			.title-bloc-products {
				width: 100%;
				margin-bottom: 20px;
				text-align: center;
			}
			.form-group {
				margin: auto;
			}
		}
		.bloc-lists-prstation-items {
			.bloc-map-list {
				height: 250px;
			}
		}
	}
`;
export const ItemFichePrestation = styled.div`
	background: #ffffff;
	box-shadow: 0 2px 9px 0 rgba(182, 172, 251, 0.42);
	border-radius: 10px;
	margin-bottom: 20px;
	padding: 33px 24px;
	transition: 0.5s ease-in-out;
	&:hover {
		.show-prestation{
			text-decoration: underline;
		}
	}
	&.activeItem {
		cursor: pointer;
	}
	&.active {
		transform: scale(1.05);
		background-color: ${GreenColor};
		color: #fff;
		&:hover {
			.show-prestation{
				text-decoration: underline;
			}
		}
		.code-postal-societe {
			color: #fff;
		}
		.show-prestation{
			color: #FFF;
		}
		.type-prestation {
			.devis-prestation {
				color: #fff;
			}
		}
		.name-societe {
			a {
				color: #fff;
				&:hover {
					color: #fff;
				}
			}
		}
	}
	.content-item-fiche {
		display: flex;
		align-items: center;
	}
	.logo-image {
		overflow: hidden;
		min-width: 75px;
		width: 75px;
		height: 75px;
		margin-right: 26px;
		img {
			width: 100%;
			height: 100%;
			object-fit: contain;
		}
	}
	.detail-item-fiche {
		margin-right: 22px;
	}
	.type-prestation {
		margin-left: auto;
	}
	.name-societe {
		font-size: 18px;
		font-weight: 600;
		line-height: 25px;
		margin-bottom: 8px;
		a {
			color: #000;
			text-decoration: none;
			transition: 0.5s ease-in-out;
			position: relative;
			&:before {
				content: "";
				position: absolute;
				bottom: 0;
				left: 0;
				height: 1px;
				width: 0;
				background: #fff;
				transition: 0.3s all;
				z-index: -1;
			}
		}
	}
	.code-postal-societe {
		display: block;
		font-size: 14px;
		line-height: 20px;
		color: #4c5f68;
		margin-bottom: 3px;
		transition: 0.5s ease-in-out;
	}
	.lists-mode-delivrance {
		font-size: 15px;
		line-height: 23px;
		span {
			display: inline;
			&:after {
				content: ",";
				position: relative;
				margin-right: 4px;
				display: inline-block;
			}
			&:last-child {
				&:after {
					content: none;
				}
			}
		}
	}
	.show-prestation{
		color: ${GreenColor};
		display: block;
		padding-top: 15px;
		text-decoration: none;
		font-weight: 500;
		font-size: 14px;
		&:hover{
			text-decoration: underline;
		}
	}
	.type-prestation {
		text-align: center;
		p {
			margin: 0;
		}
		.price-prestation {
			white-space: nowrap;
			font-size: 14px;
			line-height: 20px;
			span {
				display: block;
				font-weight: 700;
				font-size: 19px;
				line-height: 27px;
				margin-top: 8px;
			}
		}
		.devis-prestation {
			font-size: 16px;
			white-space: nowrap;
			color: ${GreenColor};
			font-weight: 600;
		}
	}
	@media (max-width: 593px) {
		width: 100%;
		padding: 22px 18px 60px 18px;
		margin-bottom: 0;
		position: relative;
		.content-item-fiche {
			flex-wrap: wrap;
			align-items: flex-start;
		}
		.head-fiche-mobile {
			display: flex;
			margin-bottom: 15px;
		}
		.logo-image {
			margin-right: 17px;
			& > a{
				display: block;
				height: 100%;
			}
		}
		.service-rating-bloc {
			margin-top: 0 !important;
			padding-top: 5px;
			& > div {
				margin-bottom: 0 !important;
			}
		}
		.detail-item-fiche {
			margin-right: 0px;
			width: 100%;

		}
		.type-prestation {
			text-align: left;
			margin-top: 5px;
			.price-prestation{
				span{
					display: inline-block;
					font-size: 17px;
					line-height: 23px;
					margin-top: 0;
					margin-left: 4px;
				}
			}
		}
		.content-detail-fiche-mobil{
			margin-bottom: 15px;
		}
		.go-item-fiche {
			width: 100%;
			padding: 13px 18px 0;
			border-top: 1px solid #efefef;
			position: absolute;
			left: 0;
			bottom: 14px;
			text-align: right;
			& > a{
				padding-top: 0;
			}
		}
		.name-societe {
			font-size: 16px;
			line-height: 23px;
			margin-bottom: 0px;
		}
	}
	.service-rating-bloc {
		margin-top: -20px;
	}
`;

export const ContentFichePrestation = styled.div`
	padding-right: 15px;
	.logo-societe {
		overflow: hidden;
		min-width: 180px;
		width: 180px;
		margin-left: auto;
		order: 2;
		img {
			width: 100%;
			border-radius: 12px;
		}
	}
	
	.info-societe {
		display: flex;
		padding-top: 30px;
		flex-wrap: wrap;
		
		.detail-info-societe {
			padding-right: 20px;
			order: 1;
			.titre-fiche-prestation {
				font-weight: 500;
				font-size: 30px;
				line-height: 36px;
				color: #444444;
				margin-bottom: 15px;
			}
			.name-societe {
				text-transform: uppercase;
				font-weight: 600;
				font-size: 25px;
				line-height: 25px;
				margin-bottom: 10px;
			}
			.fonction-societe {
				font-size: 16px;
				line-height: 23px;
				color: #4c5f68;
				margin-bottom: 30px;
			}
		}
	}
	.description-societe {
		white-space: pre-line;
		font-size: 15px;
		line-height: 21px;
		text-align: justify;
		margin-bottom: 40px;
		margin-top: 45px;
		@media (max-width: 1199px) {
			.description-societe {
				margin-top: 30px;
			}
		}
	}
	${GalerieSlideStyle} {
		.item-realisation {
			margin-bottom: 20px;
			height: 130px;
			@media (min-width: 994px) {
				width: 25%;
			}
			@media (max-width: 593px) {
				margin-bottom: 10px;
			}
			img {
				border-radius: 15px;
				cursor: pointer;
			}
		}
	}
	.cats-prestation {
		display: flex;
		align-items: baseline;
		font-size: 14px;
		margin: 20px 0 15px;
		& > span {
			margin-right: 18px;
			white-space: nowrap;
			font-weight: 600;
			line-height: 25px;
			font-size: 18px;
			color: #37454c;
			margin-bottom: 24px;
		}
		.item-cats-prestation {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			font-size: 16px;
			line-height: 23px;
			p {
				font-weight: 500;
				color: #fff;
				background-color: ${GreenColor};
				margin-bottom: 5px;
				margin-right: 8px;
				padding: 3px 12px;
				border-radius: 2px;
				&:last-child {
					margin-right: 0px;
				}
			}
		}
	}
	.info-societe-web {
		padding-bottom: 21px;
		p {
			display: flex;
			align-items: center;
			margin-bottom: 19px;
			font-size: 15px;
			line-height: 21px;
		}
		i {
			min-width: 25px;
		}
		a {
			color: #000;
			text-decoration: none;
			transition: 0.5s ease-in-out;
			display: flex;
			&:hover {
				color: ${GreenColor};
				text-decoration: underline;
			}
		}
	}
	.socials-societe {
		a {
			display: inline-block;
			margin-right: 13px;
			transition: 0.3s all;
			&:hover {
				transform: scale(1.1);
			}
		}
	}
	@media (max-width: 1280px) {
		padding-right: 60px;
	}
	@media (max-width: 1199px) {
		padding-right: 30px;
		.info-societe {
			.detail-info-societe {
				.titre-fiche-prestation {
					font-size: 28px;
					line-height: 39px;
				}
				.name-societe {
					font-size: 20px;
					line-height: 28px;
					margin-bottom: 3px;
				}
				.fonction-societe {
					font-size: 15px;
					line-height: 21px;
				}
			}
		}
	}
	@media (max-width: 593px) {
		padding-right: 0;
		order: 2;
		.logo-societe{
			margin-left: 0;
			min-width: auto;
			width: 100%;
		}
		.info-societe {
			.detail-info-societe {
				.fonction-societe {
					margin-bottom: 10px;
				}
			}
		}
	}
	@media (max-width: 767px) {
		.info-societe {
			.detail-info-societe {
				.titre-fiche-prestation {
					margin-bottom: 20px;
				}
			}
		}
		.cats-prestation {
			display: block;
			margin-bottom: 30px;
			& > span {
				display: block;
				margin-bottom: 17px;
			}
		}
		.bloc-more {
			.titre-bloc-prestation {
				margin-bottom: 10px;
			}
		}
		.info-societe-web {
			p {
				margin-bottom: 10px;
			}
		}
	}
`;

export const HomeBlocs = styled.div`
	padding: 80px 0 40px;
	.row {
		align-items: center;
		padding-bottom: 60px;
		&:last-child {
			padding-bottom: 0;
		}
		&:nth-child(2n + 2) {
			.image-content-bloc {
				padding: 0 0 0 22px;
				&:before {
					right: 22px;
					left: 0px;
				}
			}
		}
	}
	.item-content-bloc {
		margin-bottom: 30px;
		color: #748993;
		.titre-content-bloc {
			font-size: 50px;
			font-weight: 500;
			line-height: 64px;
			color: #9aca3b;
			margin-bottom: 22px;
		}
		.sub-titre-content-bloc {
			color: #444444;
			font-size: 24px;
			line-height: 36px;
		}
		.text-content-bloc {
			margin-bottom: 30px;
		}
		p {
			&:last-child {
				margin-bottom: 0;
			}
		}
		a {
			text-decoration: none;
			display: inline-block;
			button {
				width: 310px;
				max-width: 100%;
				font-size: 16px;
				border-radius: 30px;
				height: 58px;
				@media (max-width: 320px) {
					font-size: 14px;
					height: 50px;
				}
			}
		}

		@media (max-width: 1199px) {
			.titre-content-bloc {
				font-size: 39px;
				line-height: 59px;
			}
		}
		@media (max-width: 593px) {
			text-align: center;
			.titre-content-bloc {
				font-size: 31px;
				line-height: 44px;
			}
			.sub-titre-content-bloc {
				font-size: 19px;
				line-height: 28px;
			}
		}
		@media (max-width: 575px) {
			text-align: left;
			a {
				width: 100%;
				button {
					width: 100%;
				}
			}
		}
	}

	.image-content-bloc {
		max-width: 100%;
		width: 490px;
		position: relative;
		display: block;
		margin: 0 auto 30px;
		padding: 0 22px 0 0;
		img {
			width: 100%;
		}
		&:before {
			content: "";
			position: absolute;
			top: -30px;
			right: 0px;
			left: 22px;
			height: 100%;
			background: #a8d8d4;
			z-index: -1;
		}
	}
	.item-cat-univers {
		margin-bottom: 30px;
		
		.content-item-univers {
			transition: box-shadow .3s;
			border-radius:10px;
			border: 1px solid #ccc;
			background: #ffffff;
			box-shadow: 0 3px 51px 0 rgba(182, 172, 251, 0.42);
			border-radius: 20px;
			overflow: hidden;
			height: 100%;
			font-size: 18px;
			line-height: 25px;
			font-weight: 600;
			margin-bottom: 0px;
			color: #444444;
			text-decoration: none;
			text-align: center;
			display: block;
			transition: 0.4s all;
			text-transform: uppercase;
			&:hover {
				text-decoration: none;
				color: ${OrangeColor};
			}
			img {
				width: 100%;
				height: 240px;
				object-fit: cover;
				margin-bottom: 15px;
				
			}
		}
	}
`;

export const DefaultPageStyle = styled.div`
	font-size: 15px;
	line-height: 21px;
	ul,
	ol {
		margin-bottom: 20px;
	}
	p {
		margin-bottom: 25px;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		color: #444444;
		font-weight: 700;
	}
	h2 {
		margin-bottom: 20px;
		padding-top: 10px;
	}
	a {
		color: ${GreenColor};
	}
`;
export const ReadMoreBtn = styled.button`
	background-color: transparent;
    position: relative;
    border: 0;
    color: #e67c2e;
    font-size: 16px;
    padding: 0;
    font-weight: 700;
    margin-bottom: 20px;
	display: flex;
	&:after{
		content: "";
		position: relative;
		padding: 5px;
		box-shadow: 2px -2px #e67c2e inset;
		border: solid transparent;
		transition: 0.2s;
		transform: rotate(135deg);
		transform-origin: center;
		top: 4px;
		left: 10px;
	}
	&.open{
		&:after{
			transform: rotate(-45deg);
			top: 0px;
		}
	}
`;